import { AuthType, Builder } from "..";

export class HttpHeadersBuilder implements Builder<HeadersInit> {

    private headers: HeadersInit;


    constructor(){
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': `application/json, text/plain, */*`
        };
    }
    

    public setAuthentication(authType: AuthType, authData: any): HttpHeadersBuilder {
        switch (authType) {
            case AuthType.Basic:
                Object.assign(this.headers, { Authorization: `Basic ${window.btoa(authData.username + ':' + authData.password)}` });
                break;

            case AuthType.JWT:
                Object.assign(this.headers, { Authorization: `Bearer ${authData}` });       
                break;
                
            default:
                break;
        }

        return this;
    }

    public build(): HeadersInit {
        return this.headers;
    }

}