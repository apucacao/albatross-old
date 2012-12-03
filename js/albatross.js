require.config({
  deps: ['./main'],

  paths: {
    ext      : 'ext',
    templates: 'templates',
    text     : 'components/requirejs-text/text',
    jquery   : 'components/jquery/jquery',
    fitvids  : 'components/FitVids.js/jquery.fitvids',
    lodash   : 'components/lodash/lodash',
    backbone : 'components/backbone/backbone',
    moment   : 'components/moment/moment',
    mousetrap: 'components/mousetrap/mousetrap'
  },

  shim: {
    backbone: {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },

    fitvids: ['jquery']
  },

  config: {
    tapir: {
      endpoint: 'http://tapirgo.com/api/1/search.json',
      token: '4f985fa23f61b035b3000020'
    }
  }
});