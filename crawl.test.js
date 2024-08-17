const { normalizeURL, stripProtocol } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL', () => {
	const input = '';
	const actual = normalizeURL(input);
	const expected = '';

	expect(actual).toEqual(expected);
});

test('stripProtocol', () => {
	const input = 'https://www.google.com';
	const actual = normalizeURL(input);
	const stripped = stripProtocol(actual);
	const expected = 'www.google.com';

	expect(stripped).toEqual(expected);
});
