(function($) {

  /*
   * Turn an HTML element into a context menu
   *
   * Usage:
   *   $('#some-div').contextMenu({
   *     container: $('#parent-of-some-div')
   *   });
   *
   * Options:
   *
   *   container <Element> (default: null): If container is provided, its clicks
   *     are intercepted to automatically display the context menu.
   *
   *   closeClass <string> (default: menu-close): The class applied to an
   *     element within the context menu that will automatically close the
   *     context menu when clicked.
   *
   * Author: Bremen Braun
   */

  var self;
  var jq;
  var showing = false;
  var options = {};
  function ContextMenu($this, opts) {
    jq = $this;
    self = this;
    options = $.extend({
      container: null,
      closeClass: 'menu-close'
    }, opts);

    if (options.container) {
      var container = options.container;

      $(container).on('click', function(e) {
        self.showMenu(getEventDisplayCoords(jq, e));
      });
    }
    if (options.closeClass) {
      jq.find('.' + options.closeClass).on('click', function() {
        self.hideMenu();
      });
    }
  }

  ContextMenu.prototype.showMenu = function(coords) {
    var x, y;
    if (coords.pageX !== undefined) { // maybe an event was passed. Use it to get coords
      var event = coords;

      coords = getEventDisplayCoords(jq, event);
      x = coords.x;
      y = coords.y;
    }
    else {
      x = coords.x;
      y = coords.y;
    }

    jq.css({
      visibility: 'visible',
      top: y,
      left: x
    });
    jq.show();
    showing = true;
  };

  ContextMenu.prototype.hideMenu = function() {
    jq.hide();
    showing = false;
  };

  ContextMenu.prototype.toggle = function() {
    if (showing) {
      self.hideMenu();
    }
    else {
      self.showMenu();
    }
  };

  function getEventDisplayCoords(jq, event) {
    var parent = jq.parent();
    var offset = parent.offset();

    var x = event.pageX - offset.left;
    var y = event.pageY - offset.top + parent.scrollTop();

    var parentWidth = parent.width() - 20;
    var width = jq.width();

    if (x + width > parentWidth) {
      x = parentWidth - width;
    }

    return {
      x: x,
      y: y
    };
  }

  $.fn.contextMenu = function(opts) {
    return new ContextMenu(this, opts);
  };
}(jQuery));
