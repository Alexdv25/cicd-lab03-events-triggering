const { isNumber, isNonZero } = require('./validator');

function add(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Arguments must be numbers');
  return a + b;
}

function subtract(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Arguments must be numbers');
  return a - b;
}

function multiply(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Arguments must be numbers');
  return a * b;
}

function divide(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Arguments must be numbers');
  if (!isNonZero(b)) throw new Error('Division by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
