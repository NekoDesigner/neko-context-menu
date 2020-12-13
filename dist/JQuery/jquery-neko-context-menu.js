"use strict";

$.fn.NContextmenu = function (options) {
  var _this = this;

  this.items = options;
  var _window = null;
  this.items.forEach(function (item, key) {
    return item.key = key;
  });
  $(document).on('click', function () {
    return $(document).trigger('close-context-menu');
  });
  $(document).on('close-context-menu', function () {
    if (_window) _window.remove();
  });
  $(this).on('contextmenu', function (evt) {
    evt.preventDefault();
    createWindow(evt.clientX, evt.clientY);
  });

  var createWindow = function createWindow(x, y) {
    $(document).trigger('close-context-menu');
    if (_window) _window.remove();
    _window = $('<div></div>');

    _window.addClass('contextMenu_nekodev');

    _window.html("\n            <div class=\"content\">\n                <ul>\n                </ul>\n            </div>\n        ");

    _this.items.map(function (item) {
      var li = $('<li></li>');

      if (item.icon) {
        li.html(item.icon + '&nbsp;&nbsp;&nbsp;' + item.label);
      } else {
        li.html(item.label);
      }

      li.on('click', function (evt) {
        return item.callback(evt, _this, item);
      });

      _window.find('ul').first().append(li);
    });

    $('body').append(_window);

    _window.css('left', "".concat(x, "px"));

    _window.css('top', "".concat(y, "px"));
  };
};