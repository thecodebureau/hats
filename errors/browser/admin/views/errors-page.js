'use strict';

var ErrorsCollection = require('../collections/errors');
var ErrorView = require('./error');

module.exports = require('ridge/views/page').extend({
  events: {
    'click button[data-command="removeAll"]': 'removeAll',
    'click button[data-command="removeFiltered"]': 'removeFiltered',
    'click button[data-command="removePage"]': 'removePage'
  },

  elements: {
    container: '.collection.container'
  },

  subviews: {
    //paginations: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination', multi: true } ],
    search: [ '.search', require('ridge/views/search') ],
    form: [ 'form', require('ridge/views/form-styling') ]
  },

  removeAll: function () {
    var self = this;

    $.ajax({
      method: 'DELETE',
      url: '/api/errors',
      success: function () {
        self.fetch(null, self.state.get('query'));
      }
    });
  },

  removeFiltered: function () {
    var self = this;

    $.ajax({
      method: 'DELETE',
      url: '/api/errors' + location.search,
      success: function () {
        self.fetch(null, self.state.get('query'));
      }
    });
  },

  removePage: function () {
    _.invokeMap(this.modelViews, 'delete');

    this.modelViews = [];

    this.fetch(null, this.state.get('query'));
  },


  initialize: function (options) {
    this.collection = new ErrorsCollection();

    this.listenTo(this.collection, 'reset', this.reset);

    this.listenTo(this.state, 'change:query', this.fetch);
  },

  fetch: function (state, query) {
    this.collection.fetch({ reset: true, data: query });
  },

  attach: function () {
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

  renderModel: function (model) {
    console.log('hello');
    console.log(this.elements.container);
    this.modelViews.push(new ErrorView({
      model: model,
      data: this.data,
    }).enter(this.elements.container));
  },
});
