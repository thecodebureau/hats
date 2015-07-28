module.exports = {
	extends: 'Model',

	attach: function() {
		var _view = this;

		_view.app.views.Model.prototype.attach.apply(_view, arguments);

		var $controls = _view.$('.controls');

		if($controls.length > 0) {
			_view.controls = new _view.app.views.ModelControls({ el: $controls, model: _view.model, collection: _view.collection });
		}
	},

	setModel: function() {
		var _view = this;

		_view.app.views.Model.prototype.setModel.apply(_view, arguments);


		if(_view.controls) {
			_view.controls.setModel(_view.model);//set model, do update since attach (currently) calls that
		}
	}
};
