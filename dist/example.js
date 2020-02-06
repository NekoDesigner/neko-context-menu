"use strict";

var _nekoContextMenu = _interopRequireDefault(require("./neko-context-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var randomSentence = require('random-sentence');

var ContextMenu = new _nekoContextMenu["default"]({
  selector: '[data-context="main"]',
  items: [{
    name: "Add item",
    callback: function callback(evt, ui, target) {
      evt.preventDefault();
      createItem(target);
    },
    icon: 'fas fa-list-ul'
  }, {
    name: "Add container",
    callback: function callback(evt, ui) {
      evt.preventDefault();
      createContainer();
    },
    icon: 'far fa-plus-square'
  }, {
    name: "Remove container",
    callback: function callback(evt, ui, target) {
      evt.preventDefault();
      removeContainer(target, evt);
    },
    icon: 'far fa-trash-alt'
  }]
});

function createItem(parent) {
  var p = $('<p></p>');
  p.addClass('text-dark');
  p.text(randomSentence({
    min: 4,
    max: 9
  }));
  $(parent).append(p);
  new _nekoContextMenu["default"]({
    selector: p,
    items: [{
      name: 'Alert me',
      icon: 'far fa-bell',
      callback: function callback(evt, ui) {
        alert('You clicked to the element sentence : ' + ui.text());
      }
    }, {
      name: 'Delete',
      callback: function callback(evt, ui) {
        ui.remove();
      },
      icon: 'far fa-trash-alt'
    }]
  });
}

function createContainer() {
  var div = $('<div></div>');
  div.attr('data-context', 'main');
  div.html("<h1>New container</h1>");
  $('body').append(div);
  ContextMenu.refresh();
}

function removeContainer(parent, evt) {
  var elements = ContextMenu.selector.length;

  if (elements > 1) {
    $(parent).remove();
    ContextMenu.refresh();
  } else {
    alert("C'est le dernier conteneur !");
  }
}