define([
  'jquery',
  'moment'
],

function($, moment) {

  $.fn.timeago = function(options) {
    this.each(function() {
      var el = $(this);
      var description = moment(el.attr('datetime')).fromNow();
      el.contents().last().remove();
      el.append('\n' + description);
    });

    return this;
  };

});