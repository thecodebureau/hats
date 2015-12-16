module.exports = {
	models: {
		Employee: require('./model'),
	},
	middleware: {
		employees: require('./middleware'),
	},
	pages: require('./pages'),
	routes: require('./routes')
};
