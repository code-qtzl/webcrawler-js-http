function printReport(pages) {
	console.log(`\n===============\n    Report\n===============\n`);
	const sortedPages = sortPages(pages);
	for (const sortedPage of sortedPages) {
		const url = sortedPage[0];
		const hits = sortedPage[1];

		console.log(`Found ${hits} links to page: ${url}`);
	}
	console.log(`\n===============\n  End Report\n===============\n`);
}

function sortPages(pages) {
	const pagesArray = Object.entries(pages);
	pagesArray.sort((a, b) => {
		aHits = a[1];
		bHits = b[1];
		return b[1] - a[1];
	});
	return pagesArray;
}

module.exports = {
	sortPages,
	printReport,
};
