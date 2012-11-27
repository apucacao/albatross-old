define([
  'jquery',
  'underscore',
  'mousetrap'
],

function($, _, mousetrap) {

  var navigateTo = function(href) {
    console.log(href);
    if (!href) { return; }
    document.location = href;
  };

  var mappings = {

    // f -> search
    'f': function() {
      $('[type=search]').last().focus();
      return false;
    },

    'left': function(event) {
      navigateTo($('a[rel=prev]').attr('href'));
    },

    'right': function(event) {
      navigateTo($('a[rel=next]').attr('href'));
    }

  };

  return {
    init: function() {
      _(_.keys(mappings)).each(function(shortcut) {
        mousetrap.bind(shortcut, mappings[shortcut]);
      });
    }
  };

});