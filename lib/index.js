"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    return isSegment ? formatAddComma(fixedCurrency, segmentDigit) : fixedCurrency;
  } else {
    return NaN;
  }
};

var parseCurrency = function parseCurrency(currency) {
  if (isNumber(currency)) {
    return currency;
  } else if (isCurrencyFormatString(currency)) {
    return parseInt(currency.replace(/\$\s?|(,*)/g, ""), 10);
  } else {
    return NaN;
  }
};

var formatAddComma = function formatAddComma(string, segmentDigit) {
  var arr = string.split(".");
  var reg = new RegExp("\\B(?=(\\d{" + segmentDigit + "})+(?!\\d))", "g");
  var integer = arr[0].replace(reg, ",");
  return arr.length == 2 ? integer.concat(".", arr[1]) : integer;
};

var formatDecimal = function formatDecimal(value, digits) {
  return parseFloat(value).toFixed(digits);
};

var isNumber = function isNumber(value) {
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === NUMBER && !isNaN(value) && isFinite(value)) {
    return true;
  } else {
    return false;
  }
};

var isCurrencyString = function isCurrencyString(value) {
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === STRING && value.length > 0) {
    var reg = /^(\+|\-)?\d+(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

var isCurrencyFormatString = function isCurrencyFormatString(value) {
  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === STRING && value.length > 0) {
    var reg = /^(\+|\-)?\d+((\,\d+)+)?(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

module.exports = { formatCurrency: formatCurrency, parseCurrency: parseCurrency };