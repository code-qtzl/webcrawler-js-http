const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages 2 Pages', () => {
	const input = {
		'http://www.google.com/path': 1,
		'http://www.google.com': 3,
	};
	const actual = sortPages(input);
	const expected = [
		['http://www.google.com', 3],
		['http://www.google.com/path', 1],
	];
	expect(actual).toEqual(expected);
});

test('sortPages 5 Pages', () => {
	const input = {
		'http://www.google.com/path': 1,
		'http://www.google.com/path2': 3,
		'http://www.google.com/path3': 5,
		'http://www.google.com/path4': 4,
		'http://www.google.com/path5': 2,
	};
	const actual = sortPages(input);
	const expected = [
		['http://www.google.com/path3', 5],
		['http://www.google.com/path4', 4],
		['http://www.google.com/path2', 3],
		['http://www.google.com/path5', 2],
		['http://www.google.com/path', 1],
	];
	expect(actual).toEqual(expected);
});
