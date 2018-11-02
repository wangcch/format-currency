const defaultOptions = {
  decimalDigit: 2,
  segmentDigit: 3,
  isSegment: true
};

const NUMBER = "number";
const STRING = "string";

const formatCurrency = (value, options) => {
  const { decimalDigit, segmentDigit, isSegment } = Object.assign(
    {},
    defaultOptions,
    options
  );
  const currency = isNumber(value) ? value.toString() : value;
  if (isCurrencyString(currency)) {
    const fixedCurrency = formatDecimal(currency, decimalDigit);
    return isSegment
      ? formatAddComma(fixedCurrency, segmentDigit)
      : fixedCurrency;
  } else {
    return NaN;
  }
};

const parseCurrency = currency => {
  if (isNumber(currency)) {
    return currency;
  } else if (isCurrencyFormatString(currency)) {
    return parseInt(currency.replace(/\$\s?|(,*)/g, ""), 10);
  } else {
    return NaN;
  }
};

const formatAddComma = (string, segmentDigit) => {
  const arr = string.split(".");
  const reg = new RegExp(`\\B(?=(\\d{${segmentDigit}})+(?!\\d))`, "g");
  const integer = arr[0].replace(reg, ",");
  return arr.length == 2 ? integer.concat(".", arr[1]) : integer;
};

const formatDecimal = (value, digits) => {
  return parseFloat(value).toFixed(digits);
};

const isNumber = value => {
  if (typeof value === NUMBER && !isNaN(value) && isFinite(value)) {
    return true;
  } else {
    return false;
  }
};

const isCurrencyString = value => {
  if (typeof value === STRING && value.length > 0) {
    const reg = /^(\+|\-)?\d+(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

const isCurrencyFormatString = value => {
  if (typeof value === STRING && value.length > 0) {
    const reg = /^(\+|\-)?\d+((\,\d+)+)?(\.\d+)?$/;
    return reg.test(value);
  } else {
    return false;
  }
};

module.exports = { formatCurrency, parseCurrency };
