function isNumber(val) {
  return typeof val === 'number' && !isNaN(val);
}

function isNonZero(val) {
  return isNumber(val) && val !== 0;
}

module.exports = { isNumber, isNonZero };
