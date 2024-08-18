const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
	// for (const arg of process.argv) {
	// 	console.log(arg);
	// }
	if (process.argv.length < 3) {
		console.log('No website provided');
		process.exit(1);
	}
	if (process.argv.length > 3) {
		console.log('Too many website provided');
		process.exit(1);
	}

	const baseURL = process.argv[2];

	console.log(`Starting Crawl of: ${baseURL}`);
	const pages = await crawlPage(baseURL, baseURL, []);

	// for (const page in Object.entries(pages)) {
	// 	console.log(`Testing: ${baseURL} ${page}`);
	// }

	printReport(pages);
}

main();
