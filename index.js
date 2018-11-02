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
  return parseInt(currency.replace(/\$\s?|(,*)/g, ""), 10);
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
  if (!isNaN(value) && typeof value === NUMBER) {
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

module.exports = { formatCurrency, parseCurrency };
