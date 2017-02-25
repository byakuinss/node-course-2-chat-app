const expect = require('expect');
//import isRealString
const {isRealString} = require('./validation');

//isRealString
describe('isRealString', () => {

  //should reject non-string values: pass numeric values
  it('should reject non-string values: pass numeric values', () => {
	var result = isRealString(123);
  	expect(result).toBe(false);
  });

  //should reject string with only spaces
  it('should reject string with only spaces', () => {
  	var result = isRealString('     ');
  	expect(result).toBe(false);
  });

  //should allow string with non-space characters
  it('should allow string with non-space characters', () => {
  	var result = isRealString('++++');
  	expect(result).toBe(true);
  });

});
