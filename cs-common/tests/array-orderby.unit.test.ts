import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { SortingType } from '../src';
import '../src/helpers/array.extensions';

_chai.should();
@suite class ArrayOrderByUnitTest {

  private testArray: Array<Person>;

  before() {
    this.testArray = [
        { id: 1, name: "John", surname: "Doe" },
        { id: 2, name: "Mike", surname: "Roberts" },
        { id: 3, name: "Frank", surname: "Spearhead" },
        { id: 4, name: "Nick", surname: "Sullyvan" },
        { id: 5, name: "Rick", surname: "Callahan" },
    ];
  }

  @test 'SHOULD order ascending by id WHEN orderBy called by id'() {
    
    var result = this.testArray.orderBy("id");

    _chai.expect(result[0].id).to.equal(1);
    _chai.expect(result[1].id).to.equal(2);
    _chai.expect(result[2].id).to.equal(3);
    _chai.expect(result[3].id).to.equal(4);
    _chai.expect(result[4].id).to.equal(5);
  }

  @test 'SHOULD order ascending by name WHEN orderBy called by name'() {
    
    var result = this.testArray.orderBy("name");

    _chai.expect(result[0].name).to.equal("Frank");
    _chai.expect(result[1].name).to.equal("John");
    _chai.expect(result[2].name).to.equal("Mike");
    _chai.expect(result[3].name).to.equal("Nick");
    _chai.expect(result[4].name).to.equal("Rick");
  }

  @test 'SHOULD order ascending by surname WHEN orderBy called by surname'() {

    var result = this.testArray.orderBy("surname");

    _chai.expect(result[0].name).to.equal("Rick");
    _chai.expect(result[1].name).to.equal("John");
    _chai.expect(result[2].name).to.equal("Mike");
    _chai.expect(result[3].name).to.equal("Frank");
    _chai.expect(result[4].name).to.equal("Nick");
  }

  @test 'SHOULD order descending by id WHEN orderBy called by id'() {
    
    var result = this.testArray.orderBy("id", SortingType.DESCENDING);

    _chai.expect(result[0].id).to.equal(5);
    _chai.expect(result[1].id).to.equal(4);
    _chai.expect(result[2].id).to.equal(3);
    _chai.expect(result[3].id).to.equal(2);
    _chai.expect(result[4].id).to.equal(1);
  }

  @test 'SHOULD order descending by name WHEN orderBy called by name'() {
    
    var result = this.testArray.orderBy("name", SortingType.DESCENDING);

    _chai.expect(result[0].name).to.equal("Rick");
    _chai.expect(result[1].name).to.equal("Nick");
    _chai.expect(result[2].name).to.equal("Mike");
    _chai.expect(result[3].name).to.equal("John");
    _chai.expect(result[4].name).to.equal("Frank");
  }

  @test 'SHOULD order descending by surname WHEN orderBy called by surname'() {

    var result = this.testArray.orderBy("surname", SortingType.DESCENDING);

    _chai.expect(result[0].name).to.equal("Nick");
    _chai.expect(result[1].name).to.equal("Frank");
    _chai.expect(result[2].name).to.equal("Mike");
    _chai.expect(result[3].name).to.equal("John");
    _chai.expect(result[4].name).to.equal("Rick");
  }

  @test 'SHOULD delete element WHEN remove called with existing element'() {

    const elementToRemove = { id: 7, name: "Anna", surname: "Jefferson" };
    this.testArray.push(elementToRemove);

    const result = this.testArray.remove(elementToRemove);
    const foundElement = result.some(x => x === elementToRemove);

    _chai.expect(result.length).to.equal(this.testArray.length);
    _chai.expect(foundElement).to.be.false;
  }

}

export class Person{
    id: number;
    name: string;
    surname: string;
}