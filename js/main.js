require([
  'bootstrap',
  'jquery',
  'search'
],

function(bootstrap, $, search) {

  $(function() {

    // search
    if (bootstrap.search) {
      search.init({
        form: $('form.search'),
        results: $('#search-results')
      });
    }

  });

});