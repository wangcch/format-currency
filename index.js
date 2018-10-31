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
    // TODO
    return formatAddComma(currency, segmentDigit);
  } else {
    throw new TypeError("type error");
    return NaN;
  }
};

const parseCurrency = currency => {
  return parseInt(currency.replace(/\$\s?|(,*)/g, ""), 10);
};

const formatAddComma = (string, segmentDigit) => {
  const reg = new RegExp(`\\B(?=(\\d{${segmentDigit}})+(?!\\d))(\.\d)?`, "g");
  return string.replace(reg, ",");
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
    // TODO
    return true;
  } else {
    return false;
  }
};

module.exports = { formatCurrency, parseCurrency };
