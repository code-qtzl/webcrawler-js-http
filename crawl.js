function normalizeURL(url) {
	return url;
}

function stripProtocol(url) {
	return url.replace(/^(https?:\/\/)/, '');
}

module.exports = {
	normalizeURL,
	stripProtocol,
};
