"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NekoContextMenu =
/*#__PURE__*/
function () {
  function NekoContextMenu(options) {
    _classCallCheck(this, NekoContextMenu);

    if (!window.$) console.error('[NEKO CONTEXT MENU]', "This plugin need JQuery.");
    this.settings = $.extend({
      selector: 'div.context',
      items: [{
        name: 'ajouter',
        callback: null,
        icon: null
      }]
    }, options);

    this._init();

    $('body').on('click', function () {
      $('.contextMenu_nekodev').remove();
    });
  }

  _createClass(NekoContextMenu, [{
    key: "refresh",
    value: function refresh() {
      this._init();
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      this.selector = $(this.settings.selector);
      $(this.settings.selector).contextmenu(function (event) {
        var parent = $(event.target).closest(_this.settings.selector);
        event.preventDefault();
        event.stopPropagation();
        var ui = $(event.target);
        $('.contextMenu_nekodev').remove();

        var contextMenu = _this._generateContextMenu(ui, parent);

        var x = event.pageX;
        var y = event.pageY;
        contextMenu.css({
          left: x,
          top: y
        });
        $('body').append(contextMenu);
        return false;
      });
    }
  }, {
    key: "_generateContextMenu",
    value: function _generateContextMenu(ui, target) {
      var _this2 = this;

      var div = $('<div></div>');
      var content = $('<div></div>');
      var ul = $('<ul></ul>');

      var _loop = function _loop(i) {
        var li = $('<li></li>');
        var ic = $('<i></i>');

        if ('icon' in _this2.settings.items[i] && _this2.settings.items[i].icon != null) {
          ic.addClass(_this2.settings.items[i].icon);
          ic.addClass("contextMenuIcon");
        }

        li.text(_this2.settings.items[i].name);
        li.prepend(ic);
        li.click(function (evt) {
          _this2.settings.items[i].callback(evt, ui, target);
        });
        ul.append(li);
      };

      for (var i = 0; i < this.settings.items.length; i++) {
        _loop(i);
      }

      content.append(ul);
      div.append(content);
      div.addClass('contextMenu_nekodev');
      content.addClass('content');
      return div;
    }
  }]);

  return NekoContextMenu;
}();

var _default = NekoContextMenu;
exports["default"] = _default;