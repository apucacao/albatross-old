define([
  'module',
  'jquery',
], function(module, $) {

  return {
    search: function(query) {
      return $.ajax({
        url: module.config().endpoint,
        dataType: 'jsonp',
        data: {
          token: module.config().token,
          query: encodeURIComponent(query)
        }
      });
    }
  };

});