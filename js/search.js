define([
  'module',
  'jquery',
  'underscore',
  'backbone',
  'tapir',
  'text!templates/search-result.html',
  'text!templates/search-no-results.html',
  'ext/timeago'
],

function(config, $, _, Backbone, tapir, searchResultTemplate, searchResultEmptyTemplate) {

  var Result = Backbone.Model.extend({});

  var Results = Backbone.Collection.extend({
    model: Result,

    fetch: function(query) {
      if (!query) { return; }
      this.trigger('loading');
      tapir.search(query).then(_.bind(function(results) {
        this.query = query;
        this.reset(results);
        this.trigger('done');
      }, this));
    }
  });

  var SearchView = Backbone.View.extend({
    initialize: function() {
      this.$('input').val(this.options.query);
    },

    focus: function() {
      this.$('input').focus();
    }
  });

  var ResultsView = Backbone.View.extend({
    tmpl: _.template(searchResultTemplate),
    emptyTmpl: _.template(searchResultEmptyTemplate),

    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('loading', this.loading, this);
      this.collection.on('done', this.done, this);
    },

    render: function() {
      if (this.collection.length === 0) {
        this.$el.html(this.emptyTmpl({query: this.collection.query}));
      } else {
        this.$el.html(_.map(this.collection.models, function(result) {
          return this.tmpl(result.toJSON());
        }, this).join(''));

        this.$('time').timeago();
      }
    },

    loading: function() {
      this.$el.addClass('loading');
    },

    done: function() {
      this.$el.addClass('done');
    }
  });

  var search = {
    init: function(options) {
      var searchEl = options.form || $('#search');
      var resultEl = options.results || $('#search-results');
      var query = this.parseQuery();

      var results = new Results();

      var searchView = new SearchView({el: searchEl, query: query});
      var resultsView = new ResultsView({el: resultEl, collection: results});

      results.fetch(query);
    },

    parseQuery: function() {
      var match = /[?&]q=([^&?]+)/.exec(window.location.search.toString());
      return match ? decodeURIComponent(match[1]).replace(/\+/g, ' ') : '';
    }
  };

  return search;

});