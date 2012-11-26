require.config({
  deps: ['./main'],

  urlArgs: "bust=" +  (new Date()).getTime(),

  paths: {
    ext: 'ext',
    templates: 'templates',

    text: 'vendor/require.text',

    jquery: 'vendor/jquery',
    fitvids: 'vendor/jquery.fitvids',

    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone',
    moment: 'vendor/moment'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
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