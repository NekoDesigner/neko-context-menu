// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"neko-context-menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    this.selector = this.settings.selector;

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
exports.default = _default;
},{}],"../node_modules/clamp/index.js":[function(require,module,exports) {
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],"../node_modules/is-nil/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (obj) {

  return obj == null;
};

},{}],"../node_modules/has-symbols/shams.js":[function(require,module,exports) {
'use strict';
/* eslint complexity: [2, 18], max-statements: [2, 33] */

module.exports = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (typeof Symbol.iterator === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};
},{}],"../node_modules/has-symbols/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var origSymbol = global.Symbol;

var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (typeof origSymbol('foo') !== 'symbol') {
    return false;
  }

  if (typeof Symbol('bar') !== 'symbol') {
    return false;
  }

  return hasSymbolSham();
};
},{"./shams":"../node_modules/has-symbols/shams.js"}],"../node_modules/is-symbol/index.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

var hasSymbols = require('has-symbols')();

if (hasSymbols) {
  var symToStr = Symbol.prototype.toString;
  var symStringRegex = /^Symbol\(.*\)$/;

  var isSymbolObject = function isRealSymbolObject(value) {
    if (typeof value.valueOf() !== 'symbol') {
      return false;
    }

    return symStringRegex.test(symToStr.call(value));
  };

  module.exports = function isSymbol(value) {
    if (typeof value === 'symbol') {
      return true;
    }

    if (toStr.call(value) !== '[object Symbol]') {
      return false;
    }

    try {
      return isSymbolObject(value);
    } catch (e) {
      return false;
    }
  };
} else {
  module.exports = function isSymbol(value) {
    // this environment does not support Symbols.
    return false && value;
  };
}
},{"has-symbols":"../node_modules/has-symbols/index.js"}],"../node_modules/is-object/index.js":[function(require,module,exports) {
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],"../node_modules/is-function/index.js":[function(require,module,exports) {
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],"../node_modules/to-integer/index.js":[function(require,module,exports) {
'use strict';

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

var NAN = 0 / 0;

module.exports = function (value) {

  if (isNil(value)) {
    return 0;
  }

  var type = typeof value;

  if (type === 'number') {
    return value;
  } else if (type === 'boolean') {
    return value ? 1 : 0;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {

    var raw = isFunction(value.valueOf) ? value.valueOf() : value;

    value = isObject(raw) ? (raw + '') : raw;
  }


  type = typeof value;
  if (type !== 'string') {
    return type === 'number' ? value : parseInt(value, 10);
  }


  // trim
  value = value.replace(/^\s+|\s+$/g, '');


  if (/^0b[01]+$/i.test(value)) {
    return parseInt(value.slice(2), 2);
  } else if (/^0o[0-7]+$/i.test(value)) {
    return parseInt(value.slice(2), 8);
  } else if (/^0x[0-9a-f]+$/i.test(value)) {
    return parseInt(value.slice(2), 16);
  }

  if(/^0b/i.test(value)||/^0o/i.test(value)||/^[\+\-]?0x/i.test(value)){
    return NAN;
  }

  return parseInt(value, 10);
};

},{"is-nil":"../node_modules/is-nil/index.js","is-symbol":"../node_modules/is-symbol/index.js","is-object":"../node_modules/is-object/index.js","is-function":"../node_modules/is-function/index.js"}],"../node_modules/max-safe-int/index.js":[function(require,module,exports) {
'use strict';

module.exports = 9007199254740991;

},{}],"../node_modules/random-integral/index.js":[function(require,module,exports) {
'use strict';

var clamp        = require('clamp');
var toInteger    = require('to-integer');
var MAX_SAFE_INT = require('max-safe-int');
var MIN_SAFE_INT = -MAX_SAFE_INT;

function fixme(val, min, max, isMin) {

  if (typeof val !== 'number') {
    val = toInteger(val);
  }

  if (isNaN(val) || !isFinite(val)) {
    return isMin ? min : max;
  }

  return clamp(val, min, max);
}

module.exports = function (options) {

  if (options) {
    // for speed up
    if (!options.inspected) {
      options.min = fixme(options.min, MIN_SAFE_INT, MAX_SAFE_INT, true);
      options.max = fixme(options.max, MIN_SAFE_INT, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: MIN_SAFE_INT,
      max: MAX_SAFE_INT
    };
  }

  var min = options.min;
  var max = options.max;

  // swap to variables
  // ref: http://stackoverflow.com/a/16201688
  if (min > max) {
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }

  return Math.round(Math.random() * (max - min)) + min;
};

module.exports.fixme = fixme;

},{"clamp":"../node_modules/clamp/index.js","to-integer":"../node_modules/to-integer/index.js","max-safe-int":"../node_modules/max-safe-int/index.js"}],"../node_modules/random-natural/index.js":[function(require,module,exports) {
'use strict';

var randomInt    = require('random-integral');
var MAX_SAFE_INT = require('max-safe-int');

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = randomInt.fixme(options.min, 0, MAX_SAFE_INT, true);
      options.max = randomInt.fixme(options.max, 0, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_SAFE_INT
    };
  }

  options.inspected = true;

  return randomInt(options);
};

module.exports.fixme = randomInt.fixme;

},{"random-integral":"../node_modules/random-integral/index.js","max-safe-int":"../node_modules/max-safe-int/index.js"}],"../node_modules/to-str/index.js":[function(require,module,exports) {
'use strict';

/* global Symbol */

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

module.exports = function (value) {

  if (typeof value === 'string') {
    return value;
  }

  if (isNil(value)) {
    return '';
  }

  if (isSymbol(value)) {
    return Symbol.prototype.toString.call(value);
  }

  if (isObject(value) && isFunction(value.toString)) {
    return value.toString();
  }

  var result = '' + value;

  return (result === '0' && (1 / value) === -1 / 0) ? '-0' : result;
};

},{"is-nil":"../node_modules/is-nil/index.js","is-symbol":"../node_modules/is-symbol/index.js","is-object":"../node_modules/is-object/index.js","is-function":"../node_modules/is-function/index.js"}],"../node_modules/random-char/index.js":[function(require,module,exports) {
'use strict';

var isNil         = require('is-nil');
var isObject      = require('is-object');
var toString      = require('to-str');
var randomNatural = require('random-natural');

var pools = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '~!@#$%^&()*_+-={}[]'
};

pools.alpha  = pools.lower + pools.upper;
pools['all'] = pools.lower + pools.upper + pools.number + pools.symbol;

module.exports = function (options) {

  if (!isObject(options)) {
    if (isNil(options)) {
      options = { pool: pools.all };
    } else {
      options = toString(options);
      options = { pool: pools[options] || options };
    }
  }

  var pool;

  if (options.pool) {
    pool = options.pool;
  } else if (options.lower) {
    pool = pools.lower;
  } else if (options.upper) {
    pool = pools.upper;
  } else if (options.alpha) {
    pool = pools.alpha;
  } else if (options.number) {
    pool = pools.number;
  } else if (options.symbol) {
    pool = pools.symbol;
  } else {
    pool = pools.all;
  }

  pool = toString(pool);

  return pool.charAt(randomNatural({
    min: 0,
    max: pool.length - 1,
    inspected: true
  }));
};

},{"is-nil":"../node_modules/is-nil/index.js","is-object":"../node_modules/is-object/index.js","to-str":"../node_modules/to-str/index.js","random-natural":"../node_modules/random-natural/index.js"}],"../node_modules/random-syllable/index.js":[function(require,module,exports) {
'use strict';

var clamp         = require('clamp');
var isObject      = require('is-object');
var toInteger     = require('to-integer');
var randomChar    = require('random-char');
var randomNatural = require('random-natural');

module.exports = function (options) {

  var length = isObject(options)
    ? options.length
    : options;

  if (length) {
    length = toInteger(length);
    length = clamp(length, 2, 3);
  } else {
    length = randomNatural({ min: 2, max: 3 });
  }

  var consonants = 'bcdfghjklmnprstvwz'; // consonants except hard to speak ones
  var vowels = 'aeiou';                  // vowels
  var all = consonants + vowels;         // all

  var text = '';
  var char;

  for (var i = 0; i < length; i++) {
    if (i === 0) {
      // First character can be anything
      char = randomChar({ pool: all });
    } else if (consonants.indexOf(char) === -1) {
      // Last character was a vowel, now we want a consonant
      char = randomChar({ pool: consonants });
    } else {
      // Last character was a consonant, now we want a vowel
      char = randomChar({ pool: vowels });
    }

    text += char;
  }

  return text;
};

},{"clamp":"../node_modules/clamp/index.js","is-object":"../node_modules/is-object/index.js","to-integer":"../node_modules/to-integer/index.js","random-char":"../node_modules/random-char/index.js","random-natural":"../node_modules/random-natural/index.js"}],"../node_modules/random-lorem/index.js":[function(require,module,exports) {
'use strict';

var clamp          = require('clamp');
var randomNatural  = require('random-natural');
var randomSyllable = require('random-syllable');

var MIN_LEN = 2;
var MAX_LEN = 18;

module.exports = function (options) {

  options = options || {
      syllables: randomNatural({
        min: 1,
        max: 3,
        inspected: true
      })
    };

  var length    = options.length;
  var syllables = options.syllables;

  var result = '';

  if (syllables) {
    for (var i = 0; i < syllables; i++) {
      result += randomSyllable();
    }

    return result.substring(0, MAX_LEN);
  }


  if (!length && ( options.min || options.max)) {
    length = randomNatural({
      min: options.min || MIN_LEN,
      max: options.max || MAX_LEN
    });
  }

  length = length || randomNatural({
      min: MIN_LEN,
      max: MAX_LEN,
      inspected: true
    });


  length = clamp(length, MIN_LEN, MAX_LEN);


  while (result.length < length) {
    result += randomSyllable();
  }

  return result.substring(0, length);
};

},{"clamp":"../node_modules/clamp/index.js","random-natural":"../node_modules/random-natural/index.js","random-syllable":"../node_modules/random-syllable/index.js"}],"../node_modules/random-sentence/index.js":[function(require,module,exports) {
'use strict';

var clamp         = require('clamp');
var randomLorem   = require('random-lorem');
var randomNatural = require('random-natural');

var MIN_LEN = 2;
var MAX_LEN = 18;

module.exports = function (options) {

  options = options || {
      words: randomNatural({
        min: 12,
        max: 18,
        inspected: true
      })
    };

  var length = options.words;

  if (!length && (options.min || options.max)) {
    length = randomNatural({
      min: options.min || MIN_LEN,
      max: options.max || MAX_LEN
    });
  }

  length = length || randomNatural({
      min: MIN_LEN,
      max: MAX_LEN,
      inspected: true
    });

  length = clamp(length, MIN_LEN, MAX_LEN);

  var words = [];

  while (length--) {
    words.push(randomLorem());
  }

  var firstWorld = words[0];

  words[0] = firstWorld[0].toUpperCase() + firstWorld.substr(1);

  return words.join(' ') + '.';
};

},{"clamp":"../node_modules/clamp/index.js","random-lorem":"../node_modules/random-lorem/index.js","random-natural":"../node_modules/random-natural/index.js"}],"example.js":[function(require,module,exports) {
"use strict";

var _nekoContextMenu = _interopRequireDefault(require("./neko-context-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomSentence = require('random-sentence');

var ContextMenu = new _nekoContextMenu.default({
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
  new _nekoContextMenu.default({
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
  var elements = $(ContextMenu.selector).length;

  if (elements > 1) {
    $(parent).remove();
  } else {
    alert("C'est le dernier conteneur !");
  }
}
},{"./neko-context-menu":"neko-context-menu.js","random-sentence":"../node_modules/random-sentence/index.js"}],"C:/Users/tahar/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52800" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/tahar/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","example.js"], null)
//# sourceMappingURL=/example.438d3af2.js.map