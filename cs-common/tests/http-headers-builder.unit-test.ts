import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { BasicAuthentication, JwtAuthentication } from '../src';
import { HttpHeadersBuilder } from '../src/helpers/http-headers.builder';

_chai.should();
@suite class HttpHeadersBuilderUnitTest {
  
  private builderUnderTest: HttpHeadersBuilder = new HttpHeadersBuilder();

  @test 'SHOULD create bearer authentication WHEN JwtAuthentication sended'() {
    var jwtAuth = <JwtAuthentication>{ token: "test-token" };
    var result = this.builderUnderTest.setAuthentication(jwtAuth).build();
    
    console.log(result);
  }

  @test 'SHOULD create basic authentication WHEN BasicAuthentication sended'() {
    var jwtAuth = <BasicAuthentication>{ username: "user", password: "pwd" };
    var result = this.builderUnderTest.setAuthentication(jwtAuth).build();
    
    console.log(result);
  }

}
