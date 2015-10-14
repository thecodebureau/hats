module.exports = function(mw, config) {
	return [
		[ 'get', '/', mw.api.permissions.findAll ],
		[ 'get', '/:id', mw.api.permissions.findById ],
		[ 'post', '/', mw.api.permissions.create ],
		[ 'put', '/:id', mw.api.permissions.put ],
		[ 'delete', '/:id', mw.api.permissions.remove ],
	];
};
