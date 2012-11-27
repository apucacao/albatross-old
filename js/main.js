require([
  'bootstrap',
  'jquery',
  'shortcuts',
  'search',
  'fitvids',
  'ext/timeago'
],

function(bootstrap, $, shortcuts, search) {

  $(function() {

    $('article').fitVids();
    $('time').timeago();

    shortcuts.init();

    // search
    if (bootstrap.search) {
      search.init({
        form: $('form.search'),
        results: $('#search-results')
      });
    }

  });

});