import { ActionResponse } from "..";

export class HttpService {

    public async get<TBody, TRespose>(url: string): Promise<TRespose> {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': `application/json, text/plain, */*`
            }
            })
            .then(httpRespose => {
                if (!httpRespose.ok) {
                    throw new Error(httpRespose.statusText)
                }
                return httpRespose.json() as Promise<ActionResponse<TRespose>>;
            })
            .then(actionResponse => {
                return actionResponse.data
            });
    }

    public async post<TBody, TRespose>(url: string, body: TBody): Promise<TRespose> {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': `application/json, text/plain, */*`
            }
            })
            .then(httpRespose => {
                if (!httpRespose.ok) {
                    throw new Error(httpRespose.statusText)
                }
                return httpRespose.json() as Promise<ActionResponse<TRespose>>;
            })
            .then(actionResponse => {
                return actionResponse.data
            });
    }

}