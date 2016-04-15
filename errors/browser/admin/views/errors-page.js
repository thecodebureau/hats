var ErrorsCollection = require('../collections/errors');
var ErrorView = require('./error');

module.exports = require('ridge/views/page').extend({
  events: {
    'click button[data-command="removeAll"]': 'removeAll',
    'click button[data-command="removeFiltered"]': 'removeFiltered',
    'click button[data-command="removePage"]': 'removePage'
  },

  removeAll: function() {
    var _view = this;
    $.ajax({
      method: 'DELETE',
      url: '/api/errors',
      success: function() {
        _view.fetch(null, _view.state.get('query'));
      }
    });
  },

  removeFiltered: function() {
    var _view = this;
    $.ajax({
      method: 'DELETE',
      url: '/api/errors?' + _view.state.get('query'),
      success: function() {
        _view.fetch(null, _view.state.get('query'));
      }
    });
  },

  removePage: function() {
    var _view = this;

    _.invokeMap(this.modelViews, 'delete');

    this.modelViews = [];

    this.fetch(null, this.state.get('query'));
  },


  elements: {
    container: '.collection.container'
  },

  subviews: {
    paginations: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination', multi: true } ],
    search: [ '.search', require('ridge/views/search') ]
  },

  initialize: function(options) {
    this.collection = new ErrorsCollection();

    this.listenTo(this.collection, 'reset', this.reset);

    this.listenTo(this.state, 'change:query', this.fetch);
  },

  fetch: function(state, query) {
    this.collection.fetch({ reset: true, data: query });
  },

  attach: function() {
    this.collection.reset({
      totalCount: this.state.get('totalCount'),
      errors: this.state.get('errors')
    }, { parse: true });
  },

  reset: function (models, options) {
    _.invokeMap(this.modelViews, 'remove');

    this.modelViews = [];

    models.each(this.renderModel.bind(this));
  },

  renderModel: function(model) {
    this.modelViews.push(new ErrorView({
      model: model,
      data: this.data,
    }).enter(this.elements.container));
  },
});
