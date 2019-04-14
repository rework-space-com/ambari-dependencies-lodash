import assert from 'assert';
import lodashStable from 'lodash';
import { _, identity, stubZero, falsey } from './utils.js';

describe('findIndex and indexOf', function() {
  lodashStable.each(['findIndex', 'indexOf'], function(methodName) {
    var array = [1, 2, 3, 1, 2, 3],
        func = _[methodName],
        resolve = methodName == 'findIndex' ? lodashStable.curry(lodashStable.eq) : identity;

    it('`_.' + methodName + '` should return the index of the first matched value', function() {
      assert.strictEqual(func(array, resolve(3)), 2);
    });

    it('`_.' + methodName + '` should work with a positive `fromIndex`', function() {
      assert.strictEqual(func(array, resolve(1), 2), 3);
    });

    it('`_.' + methodName + '` should work with a `fromIndex` >= `length`', function() {
      var values = [6, 8, Math.pow(2, 32), Infinity],
          expected = lodashStable.map(values, lodashStable.constant([-1, -1, -1]));

      var actual = lodashStable.map(values, function(fromIndex) {
        return [
          func(array, resolve(undefined), fromIndex),
          func(array, resolve(1), fromIndex),
          func(array, resolve(''), fromIndex)
        ];
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should work with a negative `fromIndex`', function() {
      assert.strictEqual(func(array, resolve(2), -3), 4);
    });

    it('`_.' + methodName + '` should work with a negative `fromIndex` <= `-length`', function() {
      var values = [-6, -8, -Infinity],
          expected = lodashStable.map(values, stubZero);

      var actual = lodashStable.map(values, function(fromIndex) {
        return func(array, resolve(1), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should treat falsey `fromIndex` values as `0`', function() {
      var expected = lodashStable.map(falsey, stubZero);

      var actual = lodashStable.map(falsey, function(fromIndex) {
        return func(array, resolve(1), fromIndex);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should coerce `fromIndex` to an integer', function() {
      assert.strictEqual(func(array, resolve(2), 1.2), 1);
    });
  });
});