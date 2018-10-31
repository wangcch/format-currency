import test from 'ava';
import formatCurrency from './index.js';

test('test', t => {
    t.is(formatCurrency('123'), '123');
    t.is(formatCurrency('123456'), '123,456');
    t.is(formatCurrency('1234567'), '1,234,567');
});