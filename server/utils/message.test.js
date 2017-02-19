var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {

		var from = 'loki';
		var text = 'I do what I want.';

		var message = generateMessage(from, text);

		expect(message).toInclude({from,text});
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'byakuinss';
		var latitude = '1';
		var longtitude = '1';
		var url = 'https://www.google.com.tw/maps?q=1,1';

		var message = generateLocationMessage(from, latitude, longtitude);
	//property, is number, output is the correct url
		expect(message).toInclude({from});
		expect(message.createdAt).toBeA('number');
		expect(message.url).toBe(url);

//		url: `https://www.google.com.tw/maps?q=${latitude},${longitude}`,
//		createdAt: new Date().getTime()

	});
});