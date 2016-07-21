import Ember from 'ember'

import TableLayout from '../models/table-layout'

export const HeaderCell = Ember.Object.extend({
  column: null,

  classNames: Ember.computed.readOnly('column.classNames'),
  component: Ember.computed.readOnly('column.headerComponent'),
  content: Ember.computed.readOnly('column.header')
})

export const HeaderCells = Ember.ArrayProxy.extend({
  columns: Ember.computed.alias('content'),
  height: null,

  objectAtContent (idx) {
    let column = this.get('columns').objectAt(idx)
    return HeaderCell.create({ column })
  },

  layout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rows: Ember.A([{ rowHeight: this.get('height') }]),
      columnsBinding: 'source.columns'
    })
  })
})

export default Ember.Helper.helper(function (_params, hash) {
  return HeaderCells.create(hash)
})
