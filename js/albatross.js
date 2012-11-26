require.config({
  deps: ['./main'],

  paths: {
    templates: 'templates',

    text: 'vendor/require.text',

    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },

  config: {
    tapir: {
      endpoint: 'http://tapirgo.com/api/1/search.json',
      token: '4f985fa23f61b035b3000020'
    }
  }
});