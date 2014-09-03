'use strict';
var util = require('util');
var colors = util.inspect.colors;
var colo = {};

var deco = function(_styles) {
  var decorator = function(str) {
    return decorate.apply(decorator, [str]);
  };
  decorator._styles = _styles;
  decorator.__proto__ = Object.defineProperties(function(){}, styles);
  return decorator;
};

var decorate = function(str) {
  var result = str;
  this._styles.forEach(function(style) {
    var color = colors[style];
    if (color) {
      result = '\u001b[' + color[0] + 'm' + result + '\u001b[' + color[1] + 'm';
    }
  });
  return result;
};

var styles = (function () {
  var result = {};
  Object.keys(colors).forEach(function (color) {
    result[color] = {
      get: function () {
        if (!this._styles) this._styles = [];
        return deco(this._styles.concat(color));
      }
    };
  });
  return result;
})();

Object.defineProperties(colo, styles);

module.exports = colo;
