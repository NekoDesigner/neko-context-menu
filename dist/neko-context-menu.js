"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this = void 0;

var NekoContextMenu = function NekoContextMenu(options) {
  if (!window.$) console.error('[NEKO CONTEXT MENU]', "This plugin need JQuery.");
  var $this = _this;
  var settings = $.extend({
    selector: 'div.context',
    items: [{
      name: 'ajouter',
      callback: null,
      icon: null
    }]
  }, options);

  function generateContextMenu(ui) {
    var div = $('<div></div>');
    var content = $('<div></div>');
    var ul = $('<ul></ul>');

    var _loop = function _loop(i) {
      var li = $('<li></li>');
      var ic = $('<i></i>');

      if ('icon' in settings.items[i] && settings.items[i].icon != null) {
        ic.addClass(settings.items[i].icon);
        ic.addClass("contextMenuIcon");
      }

      li.text(settings.items[i].name);
      li.prepend(ic);
      li.click(function (evt) {
        settings.items[i].callback(evt, ui);
      });
      ul.append(li);
    };

    for (var i = 0; i < settings.items.length; i++) {
      _loop(i);
    }

    content.append(ul);
    div.append(content);
    div.addClass('contextMenu_nekodev');
    content.addClass('content');
    return div;
  }

  $('body').click(function () {
    $('.contextMenu_nekodev').remove();
  });
  $(settings.selector).contextmenu(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var ui = $(event.target);
    $('.contextMenu_nekodev').remove();
    var contextMenu = generateContextMenu(ui);
    var x = event.pageX;
    var y = event.pageY;
    contextMenu.css({
      left: x,
      top: y
    });
    $('body').append(contextMenu);
    return false;
  });
};

var _default = NekoContextMenu;
exports["default"] = _default;