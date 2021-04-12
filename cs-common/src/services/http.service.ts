import { ActionResponse, BasicAuthentication, JwtAuthentication } from "..";
import { HttpHeadersBuilder } from "../helpers/http-headers.builder";

export class HttpService {

    public async get<TRespose>(url: string, authData: JwtAuthentication | BasicAuthentication = null): Promise<TRespose> {
        return this.performUrlCall<TRespose>('GET', url, authData);
    }

    public async post<TBody, TRespose>(url: string, body: TBody, authData: JwtAuthentication | BasicAuthentication = null): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('POST', url, body, authData);
    }

    public async put<TBody, TRespose>(url: string, body: TBody, authData: JwtAuthentication | BasicAuthentication = null): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('PUT', url, body, authData);
    }

    public async delete<TResponse>(url: string, authData: JwtAuthentication | BasicAuthentication = null): Promise<TResponse> {
        return this.performUrlCall<TResponse>('DELETE', url, authData);
    }


    private performUrlCall<TRespose>(action: string, url: string, authData: JwtAuthentication | BasicAuthentication = null): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            headers: new HttpHeadersBuilder().setAuthentication(authData).build()})
            .then(httpRespose => {
                if (!httpRespose.ok) {
                    throw new Error(httpRespose.statusText);
                }
                return httpRespose.json() as Promise<ActionResponse<TRespose>>;
            })
            .then(actionResponse => {
                return actionResponse.data;
            });
    }
    
    private performBodyCall<TBody, TRespose>(action: string, url: string, body: TBody, authData: JwtAuthentication | BasicAuthentication = null): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            body: JSON.stringify(body),
            headers: new HttpHeadersBuilder().setAuthentication(authData).build()})
            .then(httpRespose => {
                if (!httpRespose.ok) {
                    throw new Error(httpRespose.statusText);
                }
                return httpRespose.json() as Promise<ActionResponse<TRespose>>;
            })
            .then(actionResponse => {
                return actionResponse.data;
            });
    }
}