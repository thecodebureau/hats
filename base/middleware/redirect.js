module.exports = function(config) {
	return function(path) {
		return function redirect(req, res) {
			res.redirect(path);
		};
	};
};
