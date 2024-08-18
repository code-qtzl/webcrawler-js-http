const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);
	if (baseURLObj.hostname !== currentURLObj.hostname) {
		return pages;
	}

	const normalizeCurrentURL = normalizeURL(currentURL);
	if (pages[normalizeCurrentURL] > 0) {
		pages[normalizeCurrentURL]++;
		return pages;
	}

	pages[normalizeCurrentURL] = 1;

	console.log(`Actively crawling: ${currentURL}`);

	try {
		const resp = await fetch(currentURL);

		if (resp.status > 399) {
			console.log(
				`\nError Status Code: ${resp.status}\nOn Page: ${currentURL}`,
			);
			return pages;
		}

		const contentType = resp.headers.get('content-type');

		if (!contentType.includes('text/html')) {
			console.log(
				`\nContent Type: ${resp.status}\nOn Page: ${currentURL}`,
			);
			return pages;
		}

		const htmlBody = await resp.text();

		const nextURLs = getUrlFromSting(htmlBody, baseURL);

		for (const nextURL of nextURLs) {
			pages = await crawlPage(baseURL, nextURL, pages);
		}
	} catch (err) {
		console.log(
			`\nSomething went wrong: ${err.message}\nOn Current URL: ${currentURL}`,
		);
	}

	return pages;
}

function getUrlFromSting(htmlBody, baseURL) {
	const urls = [];
	const dom = new JSDOM(htmlBody);
	const linkElements = dom.window.document.querySelectorAll('a');
	for (const linkElement of linkElements) {
		if (linkElement.href.slice(0, 1) === '/') {
			// relative
			try {
				const urlObj = new URL(`${baseURL}${linkElement.href}`);
				urls.push(urlObj.href);
			} catch (err) {
				console.log(`Error with relative URL: ${err.message}`);
			}
		} else {
			// absolute
			try {
				const urlObj = new URL(linkElement.href);
				urls.push(urlObj.href);
			} catch (err) {
				console.log(`Error with relative URL: ${err.message}`);
			}
		}
	}
	return urls;
}

function normalizeURL(url) {
	// return url;
	const urlObj = new URL(url);

	const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

	if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
		return hostPath.slice(0, -1);
	}
	return hostPath;
}

module.exports = {
	normalizeURL,
	getUrlFromSting,
	crawlPage,
};
