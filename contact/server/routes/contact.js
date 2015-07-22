module.exports = function(mw, config) {
	var mw = mw.api.contactUs;
	return [
		[ 'post', '/', [ mw ]]
	];
};
