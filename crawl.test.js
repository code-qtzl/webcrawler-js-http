const { normalizeURL } = require('./crawl.js'); //stripProtocol
const { test, expect } = require('@jest/globals');

test('normalizeURL, and strips protocol', () => {
	const input = 'https://www.google.com';
	const actual = normalizeURL(input);
	const expected = 'www.google.com';

	expect(actual).toEqual(expected);
});

test('normalizeURL, and removes trailing /', () => {
	const input = 'https://www.google.com/';
	const actual = normalizeURL(input);
	const expected = 'www.google.com';

	expect(actual).toEqual(expected);
});

test('normalizeURL, Capitals', () => {
	const input = 'https://www.Google.com/';
	const actual = normalizeURL(input);
	const expected = 'www.google.com';

	expect(actual).toEqual(expected);
});

test('normalizeURL, strip http', () => {
	const input = 'http://www.Google.com/';
	const actual = normalizeURL(input);
	const expected = 'www.google.com';

	expect(actual).toEqual(expected);
});
