import test from 'node:test';
import assert from 'node:assert';
import { createCalculator } from '../calculator.js';

// Helper: press a sequence of keys, e.g. press(c, '7', '+', '5', '=')
function press(c, ...keys) {
  for (const k of keys) {
    if (k >= '0' && k <= '9') c.inputDigit(k);
    else if (k === '.') c.inputDecimal();
    else if (k === '=') c.calculate();
    else if (k === 'C') c.clear();
    else if (k === 'B') c.backspace();
    else c.inputOperator(k); // + - * /
  }
}

// ---------- Acceptance Criteria ----------

test('AC1: 7 + 5 = displays 12', () => {
  const c = createCalculator();
  press(c, '7', '+', '5', '=');
  assert.strictEqual(c.display(), '12');
});

test('AC2: 5 / 0 = displays Error', () => {
  const c = createCalculator();
  press(c, '5', '/', '0', '=');
  assert.strictEqual(c.display(), 'Error');
});

test('AC3: 0.1 + 0.2 = displays 0.3', () => {
  const c = createCalculator();
  press(c, '0', '.', '1', '+', '0', '.', '2', '=');
  assert.strictEqual(c.display(), '0.3');
});

test('AC4: 9 then backspace displays 0', () => {
  const c = createCalculator();
  press(c, '9', 'B');
  assert.strictEqual(c.display(), '0');
});

// ---------- Functional Requirements ----------

test('FR1: subtraction, multiplication, division work', () => {
  let c = createCalculator();
  press(c, '9', '-', '4', '=');
  assert.strictEqual(c.display(), '5');

  c = createCalculator();
  press(c, '6', '*', '7', '=');
  assert.strictEqual(c.display(), '42');

  c = createCalculator();
  press(c, '8', '/', '4', '=');
  assert.strictEqual(c.display(), '2');
});

test('FR4: chained operations evaluate left to right (2 + 3 * 4 = 20)', () => {
  const c = createCalculator();
  press(c, '2', '+', '3', '*', '4', '=');
  assert.strictEqual(c.display(), '20');
});

// ---------- Edge Cases ----------

test('EC1: display recovers after Error on next key press', () => {
  const c = createCalculator();
  press(c, '5', '/', '0', '=');
  assert.strictEqual(c.display(), 'Error');
  press(c, '3');
  assert.strictEqual(c.display(), '3');
});

test('EC2: only one decimal point per number', () => {
  const c = createCalculator();
  press(c, '1', '.', '2', '.', '3');
  assert.strictEqual(c.display(), '1.23');
});

test('EC3: pressing an operator twice replaces the first one', () => {
  const c = createCalculator();
  press(c, '5', '+', '*', '3', '=');
  assert.strictEqual(c.display(), '15');
});

test('EC4: floating-point results are rounded', () => {
  const c = createCalculator();
  press(c, '0', '.', '3', '-', '0', '.', '1', '=');
  assert.strictEqual(c.display(), '0.2');
});

test('EC5: backspace right after an operator does nothing', () => {
  const c = createCalculator();
  press(c, '5', '+', 'B');
  assert.strictEqual(c.display(), '5');
});