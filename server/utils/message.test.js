var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {

		var from = 'loki';
		var text = 'I do what I want.';

		var message = generateMessage(from, text);

		expect(message).toInclude({from,text});
		expect(message.createdAt).toBeA('number');
	});
});