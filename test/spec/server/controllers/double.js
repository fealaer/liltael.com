'use strict';

describe('Doubled: calculate', function () {
  var doubled = require('../../../../server/controllers/doubled');

  it('should calculate doubled value for variable', function () {
    expect(doubled.calculate(2)).toBe(4);
  });
});