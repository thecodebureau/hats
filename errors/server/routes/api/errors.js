module.exports = function(mw, config) {
	mw = mw.api.errors;

	return [
		//[ 'post', '/', mw.register ],
		[ 'get', '/', mw.findAll ],
		[ 'get', '/:id', mw.findOne ],
		[ 'delete', '/:id', mw.delete ],
		//[ 'put', '/:id', mw.update ],
		//[ 'patch', '/:id', mw.update ],
	];
};
