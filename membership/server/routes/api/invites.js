module.exports = function (mw) {
	return [
		[ 'get', '/', mw.api.invites.findAll ],
		[ 'post', '/', mw.api.invites.create ],
		[ 'put', '/:id', mw.api.invites.update ],
		[ 'delete', '/:id', mw.api.invites.remove ]
	];
};
