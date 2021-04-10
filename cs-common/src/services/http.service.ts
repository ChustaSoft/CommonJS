import { AuthType, ActionResponse } from "..";
import { HttpHeadersBuilder } from "../helpers/http-headers.builder";

export class HttpService {

    public async get<TRespose>(url: string, authType: AuthType = AuthType.None, authData: any = null): Promise<TRespose> {
        return this.performUrlCall<TRespose>('GET', url, authType, authData);
    }

    public async post<TBody, TRespose>(url: string, body: TBody, authType: AuthType = AuthType.None, authData: any = null): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('POST', url, body, authType, authData);
    }

    public async put<TBody, TRespose>(url: string, body: TBody, authType: AuthType = AuthType.None, authData: any = null): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('PUT', url, body, authType, authData);
    }

    public async delete<TResponse>(url: string, authType: AuthType = AuthType.None, authData: any = null): Promise<TResponse> {
        return this.performUrlCall<TResponse>('DELETE', url, authType, authData);
    }


    private performUrlCall<TRespose>(action: string, url: string, authType: AuthType, authData: any = null): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            headers: new HttpHeadersBuilder().setAuthentication(authType, authData).build()})
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
    
    private performBodyCall<TBody, TRespose>(action: string, url: string, body: TBody, authType: AuthType, authData: any = null): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            body: JSON.stringify(body),
            headers: new HttpHeadersBuilder().setAuthentication(authType, authData).build()})
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