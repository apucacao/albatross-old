define([
  'jquery',
  'backbone'
],

function($, Backbone) {

  var Browser = Backbone.Router.extend({
    routes: {
      '*slug': 'post'
    },

    post: function(slug) {
      var xhr = $.get('/' + slug);

      this.mask();
      xhr.success($.proxy(this, 'display'));
      xhr.fail($.proxy(this, 'cannotDisplay'));
    },

    display: function(html) {
      var content = $(html).find('#content');
      $('#content').replaceWith(content);
      this.unmask();
    },

    cannotDisplay: function(xhr, error, status) {
      $('#mask .status').removeClass('ss-ellipsis').addClass('ss-alert');
    },

    mask: function() {
      $('body').addClass('loading');
    },

    unmask: function() {
      $(document).scrollTop(0);
      $('body').removeClass('loading');
    }
  });

  return Browser;

});