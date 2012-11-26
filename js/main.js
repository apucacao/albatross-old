require([
  'bootstrap',
  'jquery',
  'search',
  'ext/timeago'
],

function(bootstrap, $, search) {

  $(function() {

    $('time').timeago();

    // search
    if (bootstrap.search) {
      search.init({
        form: $('form.search'),
        results: $('#search-results')
      });
    }

  });

});