const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages 2 Pages', () => {
	const input = {
		'http://www.mavenandy.com/path': 1,
		'http://www.mavenandy.com': 3,
	};
	const actual = sortPages(input);
	const expected = [
		['http://www.mavenandy.com', 3],
		['http://www.mavenandy.com/path', 1],
	];
	expect(actual).toEqual(expected);
});

test('sortPages 5 Pages', () => {
	const input = {
		'http://www.mavenandy.com/path': 1,
		'http://www.mavenandy.com/path2': 3,
		'http://www.mavenandy.com/path3': 5,
		'http://www.mavenandy.com/path4': 4,
		'http://www.mavenandy.com/path5': 2,
	};
	const actual = sortPages(input);
	const expected = [
		['http://www.mavenandy.com/path3', 5],
		['http://www.mavenandy.com/path4', 4],
		['http://www.mavenandy.com/path2', 3],
		['http://www.mavenandy.com/path5', 2],
		['http://www.mavenandy.com/path', 1],
	];
	expect(actual).toEqual(expected);
});
