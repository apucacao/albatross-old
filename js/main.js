require([
  'bootstrap',
  'jquery',
  'backbone',
  'mousetrap',
  'search',
  'browser',
  'fitvids',
  'ext/timeago'
],

function(bootstrap, $, Backbone, mousetrap, search, Browser) {

  function setup() {
    $('article').fitVids();
    $('time').timeago();

    $(document).on('click', 'a[rel=prev], a[rel=next]', function(event) {
      var post = $(event.target).attr('href');
      post && Backbone.history.navigate(post + '/', true);
      return false;
    });

    mousetrap.bind(['left', 'right'], function(event, key) {
      var map = {
        'left': 'prev',
        'right': 'next'
      };

      var post = $('a[rel=' + map[key] + ']').attr('href');
      post && Backbone.history.navigate(post + '/', true);
    });
  }

  $(function() {
    var browser = new Browser();
    browser.on('ready', setup);

    setup();

    // search
    if (bootstrap.search) {
      search.init({
        form: $('form.search'),
        results: $('#search-results')
      });
    }

    Backbone.history.start({ pushState: true, silent: true });
  });

});