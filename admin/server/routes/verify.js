module.exports = function(mw, epiphany) {
	return [
		[ 'get', '/', mw.api.users.verify ]
	];
};
