module.exports = function(mw, config) {
	mw = mw.api.errors;

	return [
		[ 'get', '/', [ mw.formatQuery, mw.paginate, mw.find ]],
		[ 'get', '/:id', mw.findById ],
		[ 'delete', '/:id', mw.remove ],
		[ 'delete', '/', [ mw.formatQuery, mw.removeQuery ]],
	];
};
