var assert = require('assert');


describe('Array', function () {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
  });
});

// var MyClass = require()
// var chai = require("chai")
// var myObj = new MyClass()    
// var expect = chai.expect

// it("class component", () => {
//     expect(myObj(2,3)).to.equal(5)
// })