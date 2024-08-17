const { normalizeURL, getUrlFromSting } = require('./crawl.js');
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

test('getUrlFromHTML, absolute', () => {
	const inputHTMLBody = `
    <html><body><a href="https://developer.mozilla.org/">URL: hostname</a></body></html>
    `;
	const inputBaseURL = 'https://developer.mozilla.org/';
	const actual = getUrlFromSting(inputHTMLBody, inputBaseURL);
	const expected = ['https://developer.mozilla.org/'];

	expect(actual).toEqual(expected);
});

test('getUrlFromHTML, relative', () => {
	const inputHTMLBody = `
    <html><body><a href="/path/">URL: hostname</a></body></html>
    `;
	const inputBaseURL = 'https://developer.mozilla.org';
	const actual = getUrlFromSting(inputHTMLBody, inputBaseURL);
	const expected = ['https://developer.mozilla.org/path/'];

	expect(actual).toEqual(expected);
});

test('getUrlFromHTML, for both absolute and relative', () => {
	const inputHTMLBody = `
    <html><body>
		<a href="https://developer.mozilla.org/path1/">URL: hostname One</a>
		<a href="/path2/">URL: hostname Two</a>
	</body></html>
    `;
	const inputBaseURL = 'https://developer.mozilla.org';
	const actual = getUrlFromSting(inputHTMLBody, inputBaseURL);
	const expected = [
		'https://developer.mozilla.org/path1/',
		'https://developer.mozilla.org/path2/',
	];
	expect(actual).toEqual(expected);
});

test('getUrlFromHTML, invalid', () => {
	const inputHTMLBody = `
    <html><body><a href="invalid">Invalid URL</a></body></html>
    `;
	const inputBaseURL = 'https://developer.mozilla.org';
	const actual = getUrlFromSting(inputHTMLBody, inputBaseURL);
	const expected = [];

	expect(actual).toEqual(expected);
});
