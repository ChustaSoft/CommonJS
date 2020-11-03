import { ActionResponse } from "..";

export class HttpService {

    public async get<TRespose>(url: string): Promise<TRespose> {
        return this.performUrlCall<TRespose>('GET', url);
    }

    public async post<TBody, TRespose>(url: string, body: TBody): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('POST', url, body);
    }

    public async put<TBody, TRespose>(url: string, body: TBody): Promise<TRespose> {
        return this.performBodyCall<TBody, TRespose>('PUT', url, body);
    }

    public async delete<TResponse>(url: string): Promise<TResponse> {
        return this.performUrlCall<TResponse>('DELETE', url);
    }


    private performUrlCall<TRespose>(action: string, url: string): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            headers: {
                'Accept': `application/json, text/plain, */*`
            }})
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
    
    private performBodyCall<TBody, TRespose>(action: string, url: string, body: TBody): TRespose | PromiseLike<TRespose> {
        return fetch(url, {
            method: action,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': `application/json, text/plain, */*`
            }})
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