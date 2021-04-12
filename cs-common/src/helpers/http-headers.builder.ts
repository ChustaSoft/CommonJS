import { JwtAuthentication, BasicAuthentication, Builder } from "..";

export class HttpHeadersBuilder implements Builder<HeadersInit> {

    private headers: HeadersInit;


    constructor(){
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': `application/json, text/plain, */*`
        };
    }
    

    public setAuthentication(authData: JwtAuthentication | BasicAuthentication): HttpHeadersBuilder {
        if(authData instanceof JwtAuthentication){
            Object.assign(this.headers, { Authorization: `Bearer ${authData.token}` });     
        }
        else if(authData instanceof BasicAuthentication) {
            Object.assign(this.headers, { Authorization: `Basic ${window.btoa(authData.username + ':' + authData.password)}` });
        }       

        return this;
    }

    

    public build(): HeadersInit {
        return this.headers;
    }

}