"use strict";

var _nekoContextMenu = _interopRequireDefault(require("./neko-context-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContextMenu = new _nekoContextMenu["default"]({
  selector: '[data-level="context-menu"]',
  items: [{
    name: "New folder",
    callback: function callback(evt, ui) {
      evt.preventDefault();
      alert('New folder called !');
    },
    icon: 'fas fa-folder'
  }, {
    name: "Rename",
    callback: function callback(evt, ui) {
      alert('Rename called !');
    },
    icon: 'fas fa-edit'
  }, {
    name: "Details",
    callback: function callback(evt, ui) {
      alert('Details called !');
    },
    icon: 'fas fa-eye'
  }, {
    name: "Delete",
    callback: function callback(evt, ui) {
      alert('delete called');
    },
    icon: 'fas fa-trash'
  }]
});