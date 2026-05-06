const { add, subtract, multiply, divide } = require('../src/calculator');

describe('add', () => {
  test('adds two positive numbers', () => expect(add(2, 3)).toBe(5));
  test('adds negative numbers', () => expect(add(-1, -2)).toBe(-3));
  test('adds zero', () => expect(add(5, 0)).toBe(5));
  test('throws on non-number input', () => expect(() => add('a', 1)).toThrow(TypeError));
});

describe('subtract', () => {
  test('subtracts two numbers', () => expect(subtract(10, 4)).toBe(6));
  test('result can be negative', () => expect(subtract(2, 5)).toBe(-3));
  test('throws on non-number input', () => expect(() => subtract(1, null)).toThrow(TypeError));
});

describe('multiply', () => {
  test('multiplies two numbers', () => expect(multiply(3, 4)).toBe(12));
  test('multiply by zero', () => expect(multiply(99, 0)).toBe(0));
  test('throws on non-number input', () => expect(() => multiply('x', 2)).toThrow(TypeError));
});

describe('divide', () => {
  test('divides two numbers', () => expect(divide(10, 2)).toBe(5));
  test('returns float', () => expect(divide(1, 3)).toBeCloseTo(0.333));
  test('throws on division by zero', () => expect(() => divide(5, 0)).toThrow('Division by zero'));
  test('throws on non-number input', () => expect(() => divide(10, 'b')).toThrow(TypeError));
});
