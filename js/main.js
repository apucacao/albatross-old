require([
  'bootstrap',
  'jquery',
  'search',
  'fitvids',
  'ext/timeago'
],

function(bootstrap, $, search) {

  $(function() {

    $('article').fitVids();
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