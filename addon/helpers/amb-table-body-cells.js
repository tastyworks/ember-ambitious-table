import Ember from 'ember'
import TableLayout from '../models/table-layout'

export const BodyCell = Ember.Object.extend({
  row: null,
  column: null,

  classNames: Ember.computed.union('row.classNames', 'column.classNames'),

  component: Ember.computed('column.cellComponent', function () {
    return this.get('column.cellComponent') || 'amb-table-cell'
  }),

  content: Ember.computed('row', 'column.contentPath', function () {
    let column = this.get('column')
    return column.getCellContent(this.get('row'))
  })
})

export const BodyCells = Ember.ArrayProxy.extend({
  rows: null,
  columns: null,

  content: Ember.computed('rows.[]', 'columns.[]', function () {
    let cells = []
    let columns = this.get('columns')
    this.get('rows').forEach((row) => {
      columns.forEach((column) => {
        cells.push(BodyCell.create({ row, column }))
      })
    })
    return cells
  }),

  layout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rowsBinding: 'source.rows',
      columnsBinding: 'source.columns',
      defaultRowHeightBinding: 'source.defaultRowHeight'
    })
  })
})

export default Ember.Helper.helper(function (_params, hash) {
  return BodyCells.create(hash)
})
