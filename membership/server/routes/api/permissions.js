module.exports = function(mw, config) {
	return [
		[ 'get', '/', mw.api.permissions.findAll ],
		[ 'post', '/', mw.api.permissions.create ],
		[ 'put', '/:id', mw.api.permissions.update ],
		[ 'delete', '/:id', mw.api.permissions.remove ],
	];
};
