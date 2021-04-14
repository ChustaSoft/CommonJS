import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { BasicAuthentication, JwtAuthentication } from '../src';
import { HttpHeadersBuilder } from '../src/helpers/http-headers.builder';

_chai.should();
@suite class HttpHeadersBuilderUnitTest {
  
  @test 'SHOULD create bearer authentication WHEN JwtAuthentication sended'() {
    var builderUnderTest: HttpHeadersBuilder = new HttpHeadersBuilder();

    const token = "test-token";
    const jwtAuth = new JwtAuthentication(token);

    var result = builderUnderTest.setAuthentication(jwtAuth).build();
    
    _chai.expect(result['Authorization']).to.equal(`Bearer ${token}`);
  }

  @test 'SHOULD create basic authentication WHEN BasicAuthentication sended'() {
    var builderUnderTest: HttpHeadersBuilder = new HttpHeadersBuilder();

    const user = "usernname", pass = "pwd";
    const basicAuth = new BasicAuthentication(user, pass);

    var result = builderUnderTest.setAuthentication(basicAuth).build();
    
    _chai.expect(result['Authorization']).to.equal(`Basic ${btoa(user + ':' + pass)}`);
  }

  @test 'SHOULD create empty authentication WHEN BasicAuthentication sended'() {
    var builderUnderTest: HttpHeadersBuilder = new HttpHeadersBuilder();

    var result = builderUnderTest.setAuthentication(null).build();
    
    _chai.expect(result['Authorization']).to.be.a('undefined');
  }

}
