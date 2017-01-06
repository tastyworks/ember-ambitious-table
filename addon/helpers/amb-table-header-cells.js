import Ember from 'ember'

import TableLayout from '../models/table-layout'

export const HeaderCell = Ember.Object.extend({
  column: null,

  defaultClassNames: Ember.A(['amb-table-cell', 'amb-table-header-cell']),
  classNames: Ember.computed.union('defaultClassNames', 'column.classNames.[]'),
  component: Ember.computed.readOnly('column.headerComponent'),
  content: Ember.computed.readOnly('column.header')
})

export const HeaderCells = Ember.ArrayProxy.extend({
  columns: null,
  height: null,

  content: Ember.computed('columns.[]', function () {
    return this.get('columns').map((column) => HeaderCell.create({ column }))
  }),

  layout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rows: Ember.A([{ rowHeight: this.get('defaultRowHeight') }]),
      columnsBinding: 'source.columns'
    })
  })
})

export default Ember.Helper.helper(function (_params, hash) {
  return HeaderCells.create(hash)
})
