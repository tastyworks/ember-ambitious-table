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
  rows: Ember.computed.alias('content'),
  columns: null,

  length: Ember.computed('rows.length', 'columns.length', function () {
    return this.get('rows.length') * this.get('columns.length')
  }),

  objectAtContent (idx) {
    let numColumns = this.get('columns.length')
    let r = Math.floor(idx / numColumns)
    let c = idx % numColumns

    return BodyCell.create({
      row: this.get('rows').objectAt(r),
      column: this.get('columns').objectAt(c)
    })
  },

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
