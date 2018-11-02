import test from "ava";
import { formatCurrency, parseCurrency } from "./index.js";

test("format-integer", t => {
  t.is(formatCurrency("123"), "123.00");
  t.is(formatCurrency("123456"), "123,456.00");
  t.is(formatCurrency("1234567"), "1,234,567.00");
  t.is(formatCurrency("-123"), "-123.00");
  t.is(formatCurrency("+123"), "123.00");
});

test("format-decimal", t => {
  t.is(formatCurrency("123.00"), "123.00");
  t.is(formatCurrency("123.0000"), "123.00");
  t.is(formatCurrency("1234.1234"), "1,234.12");
  t.is(formatCurrency("1234.125"), "1,234.13");
  t.is(formatCurrency("0.125"), "0.13");
});

test("format-decimal-digit", t => {
  t.is(formatCurrency("123.00", { decimalDigit: 0 }), "123");
  t.is(formatCurrency("123.5", { decimalDigit: 0 }), "124");
})

test("format-segment", t => {
  t.is(formatCurrency("123456", { isSegment: false }), "123456.00");
  t.is(formatCurrency("123456", { segmentDigit: 4 }), "12,3456.00");
  t.is(formatCurrency("123456", { isSegment: false, segmentDigit: 4 }), "123456.00");
});

test("format-typeErr", t => {
  t.is(formatCurrency(""), NaN);
  t.is(formatCurrency({}), NaN);
  t.is(formatCurrency("abc"), NaN);
  t.is(formatCurrency("1."), NaN);
  t.is(formatCurrency("1."), NaN);
  t.is(formatCurrency(".1"), NaN);
  t.is(formatCurrency("1.1.1"), NaN);
});

test("parse-integer", t => {
  t.is(parseCurrency("123"), 123);
  t.is(parseCurrency("123,456"), 123456);
  t.is(parseCurrency("1,234,567"), 1234567);
  t.is(parseCurrency("-123"), -123);
  t.is(parseCurrency("+123"), +123);
});
