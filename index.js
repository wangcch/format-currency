const defaultOptions = {
  segmentDigit: 3
};

const formatCurrency = str => {
  const reg = new RegExp(
    `\\B(?=(\\d{${defaultOptions.segmentDigit}})+(?!\\d))`,
    "g"
  );
  return str.replace(reg, ",");
};

module.exports = formatCurrency;
