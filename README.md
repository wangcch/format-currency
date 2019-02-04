# Format Currency

Help you with currency formatter

[![Build Status](https://travis-ci.org/wangcch/format-currency.svg?branch=master)](https://travis-ci.org/wangcch/format-currency)
![](https://img.shields.io/npm/v/@wangcch/format-currency.svg)
![](https://img.shields.io/npm/l/@wangcch/format-currency.svg)

## Install

```shell
npm install --save @wangcch/format-currency
```

## Usage

```js
import { formatCurrency, parseCurrency } from "@wangcch/format-currency";
```

```js
formatCurrency(value, [options]);
parseCurrency(value);
```

### Options

| parameter    | type    | default | explain                |
| ------------ | ------- | ------- | ---------------------- |
| decimalDigit | number  | 2       | Reserved decimal digit |
| segmentDigit | number  | 3       | Currency segment digit |
| isSegment    | boolean | true    | Character segmentation |

## Demo

### formatCurrency

```js
formatCurrency("123"); // "123.00"
formatCurrency("-123"); //"-123.00"
formatCurrency(123); // "123.00"
formatCurrency("123456"); // "123,456.00"
formatCurrency("1234.567"); // "1234.57"
formatCurrency("123.00", { decimalDigit: 0 }); // "123"
formatCurrency("123456", { segmentDigit: 5 }); // "1,23456.00"
formatCurrency("123456", { isSegment: false }); // "123456.00"
formatCurrency("1234.5678", { decimalDigit: 1, isSegment: false }); // "1234.6"

// Error
formatCurrency("abc"); // NaN
formatCurrency("1."); // NaN
formatCurrency(".1"); // NaN
formatCurrency("1.2.3"); // NaN
formatCurrency(Infinity); //NaN
formatCurrency(null); //NaN
formatCurrency(undefined); //NaN
```

### parseCurrency

```js
parseCurrency("123,456"); //123456
parseCurrency("123.456"); //123.456

// Error
parseCurrency("abc"); // NaN
parseCurrency("1."); // NaN
parseCurrency(".1"); // NaN
parseCurrency("1.2.3"); // NaN
parseCurrency(Infinity); //NaN
parseCurrency(null); //NaN
parseCurrency(undefined); //NaN
```

## Test

```js
npm install && npm test
```

## License

MIT
