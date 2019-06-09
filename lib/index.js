"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.parseCurrency = exports.formatCurrency = void 0;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

var defaultOptions = {
  decimalDigit: 2,
  segmentDigit: 3,
  isSegment: true
};
var NUMBER = "number";
var STRING = "string";

var formatCurrency = function formatCurrency(value, options) {
  var _Object$assign = Object.assign({}, defaultOptions, options),
    decimalDigit = _Object$assign.decimalDigit,
    segmentDigit = _Object$assign.segmentDigit,
    isSegment = _Object$assign.isSegment;

  var currency = isNumber(value) ? value.toString() : value;

  if (isCurrencyString(currency)) {
    var fixedCurrency = formatDecimal(currency, decimalDigit);
    return isSegment
      ? formatAddComma(fixedCurrency, segmentDigit)
      : fixedCurrency;
  } else {
    return NaN;
  }
};

exports.formatCurrency = formatCurrency;

var parseCurrency = function parseCurrency(currency) {
  if (isNumber(currency)) {
    return currency;
  } else if (isCurrencyFormatString(currency)) {
    return parseInt(currency.replace(/\$\s?|(,*)/g, ""), 10);
  } else {
    return NaN;
  }
};

exports.parseCurrency = parseCurrency;

var formatAddComma = function formatAddComma(string, segmentDigit) {
  var arr = string.split(".");
  var reg = new RegExp("\\B(?=(\\d{".concat(segmentDigit, "})+(?!\\d))"), "g");
  var integer = arr[0].replace(reg, ",");
  return arr.length == 2 ? integer.concat(".", arr[1]) : integer;
};

var formatDecimal = function formatDecimal(value, digits) {
  return parseFloat(value).toFixed(digits);
};

var isNumber = function isNumber(value) {
  if (_typeof(value) === NUMBER && !isNaN(value) && isFinite(value)) {
    return true;
  } else {
    return false;
  }
};

var isCurrencyString = function isCurrencyString(value) {
  if (_typeof(value) === STRING && value.length > 0) {
    var reg = /^(\+|\-)?\d+(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

var isCurrencyFormatString = function isCurrencyFormatString(value) {
  if (_typeof(value) === STRING && value.length > 0) {
    var reg = /^(\+|\-)?\d+((\,\d+)+)?(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

var _default = formatCurrency;
exports["default"] = _default;
