import { module, test } from 'qunit'

import bsearch from 'ember-ambitious-table/utils/bsearch'

module('Unit | Util | bsearch')

test('bsearch()', function (assert) {
  let array = [1, 4, 5]
  assert.equal(bsearch(array, 1), 0)
  assert.equal(bsearch(array, 4), 1)
  assert.equal(bsearch(array, 5), 2)
})
