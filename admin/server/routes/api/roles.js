module.exports = function(mw, config) {
	return [
		[ 'get', '/', mw.api.roles.findAll ],
		[ 'get', '/:id', mw.api.roles.findById ],
		[ 'post', '/', mw.api.roles.create ],
		//[ 'put', '/:id', mw.api.roles.update ],
		[ 'delete', '/:id', mw.api.roles.remove ]
	];
};
