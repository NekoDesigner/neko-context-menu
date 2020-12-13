"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @author NekoDev<tahar.chibane@gmail.com>
 * @class NContextMenu
 */
var NContextMenu = /*#__PURE__*/function () {
  /**
   * Creates an instance of NContextMenu.
   * 
   * @param {HTMLElement|string} target
   * @memberof NContextMenu
   */
  function NContextMenu(target) {
    _classCallCheck(this, NContextMenu);

    this.openHandler = this.open.bind(this);
    this.closeHandler = this.close.bind(this);
    this.load(target).events();
    this.items = [];
  }
  /**
   *
   *
   * @param {HTMLElement|string} target
   * @return {NContextMenu} 
   * @memberof NContextMenu
   */


  _createClass(NContextMenu, [{
    key: "load",
    value: function load(target) {
      this.target = typeof target === 'string' ? document.querySelector(target) : target;
      return this;
    }
    /**
     *
     *
     * @return {NContextMenu} 
     * @memberof NContextMenu
     */

  }, {
    key: "refresh",
    value: function refresh() {
      this.target.removeEventListener('contextmenu', this.openHandler);
      document.body.removeEventListener('click', this.closeHandler);
      document.removeEventListener('close-context-menu', this.closeHandler);
      this.load().events();
      return this;
    }
    /**
     *
     *
     * @return {NContextMenu} 
     * @memberof NContextMenu
     */

  }, {
    key: "events",
    value: function events() {
      this.target.addEventListener('contextmenu', this.openHandler);
      document.body.addEventListener('click', this.closeHandler);
      document.addEventListener('close-context-menu', this.closeHandler);
      return this;
    }
    /**
     *
     *
     * @param {MenuItem} menuItem
     * @return {NContextMenu}
     * @memberof NContextMenu
     */

  }, {
    key: "add",
    value: function add(menuItem) {
      this.items = [].concat(_toConsumableArray(this.items), [menuItem]);
      return this;
    }
    /**
     *
     *
     * @param {MenuItem|number} menuItem
     * @return {NContextMenu}
     * @memberof NContextMenu
     */

  }, {
    key: "remove",
    value: function remove(menuItem) {
      var index = null;

      if (_typeof(menuItem) == 'object') {
        index = this.items.indexOf(menuItem);
      } else {
        index = menuItem;
      }

      if (index > -1) this.items.splice(index, 1);
      return this;
    }
    /**
     *
     *
     * @param {MouseEvent} e
     * @memberof NContextMenu
     */

  }, {
    key: "open",
    value: function open(e) {
      e.preventDefault();
      this.createWindow(e.clientX, e.clientY);
    }
    /**
     *
     *
     * @memberof NContextMenu
     */

  }, {
    key: "close",
    value: function close() {
      this.removeWindow();
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof NContextMenu
     */

  }, {
    key: "createWindow",
    value: function createWindow(x, y) {
      var _this = this;

      document.dispatchEvent(new Event('close-context-menu'));
      this.window = document.createElement('div');
      this.window.className = 'contextMenu_nekodev';
      this.window.innerHTML = "\n            <div class=\"content\">\n                <ul>\n                </ul>\n            </div>\n        ";
      document.body.appendChild(this.window);
      this.items.map(function (item) {
        var el = item.createItem(_this.target, item);

        _this.window.querySelector('ul').appendChild(el);
      });
      this.window.style.left = x + 'px';
      this.window.style.top = y + 'px';
    }
    /**
     *
     *
     * @memberof NContextMenu
     */

  }, {
    key: "removeWindow",
    value: function removeWindow() {
      if (this.window) this.window.remove();
    }
  }]);

  return NContextMenu;
}();
/**
 *
 *
 * @author NekoDev<tahar.chibane@gmail.com>
 * @class MenuItem
 */


var MenuItem = /*#__PURE__*/function () {
  /**
   * Creates an instance of MenuItem.
   * 
   * @param {string} label
   * @param {Function} callback
   * @param {string} [icon=null]
   * @memberof MenuItem
   */
  function MenuItem(label, callback) {
    var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, MenuItem);

    this.label = label;
    this.callback = callback;
    this.icon = icon;
  }
  /**
   *
   *
   * @param {HTMLElement} target
   * @param {MenuItem} item
   * @return {HTMLElement} 
   * @memberof MenuItem
   */


  _createClass(MenuItem, [{
    key: "createItem",
    value: function createItem(target, item) {
      var _this2 = this;

      var li = document.createElement('li');

      if (this.icon) {
        var span = document.createElement('span');
        span.className = "contextMenuIcon";
        span.innerHTML = this.icon;
        li.appendChild(span);
      }

      li.innerHTML += this.label;
      li.addEventListener('click', function (evt) {
        evt.preventDefault();

        _this2.callback(evt, {
          target: target,
          item: item
        });
      });
      return li;
    }
  }]);

  return MenuItem;
}();

exports.MenuItem = MenuItem;
var _default = NContextMenu;
exports["default"] = _default;