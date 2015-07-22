module.exports = function(mw, config) {
	return [
		[ 'post', '/', mw.admin.imageUpload ]
	];
};
