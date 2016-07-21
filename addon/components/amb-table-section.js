import Ember from 'ember'
import layout from '../templates/components/amb-table-section'

import ColumnDefinition from '../models/column-definition'
import Cell from '../models/cell'
import TableLayout from '../layouts/table'

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  classNames: 'amb-table-section',
  attributeBindings: ['style'],

  rows: null,
  columns: null,
  tableLayout: null,

  style: Ember.computed('width', function () {
    let width = this.get('width')
    if (width) {
      return Ember.String.htmlSafe(`flex: 0 0 ${width}px`)
    }
  }),

  items: Ember.computed('columns.[]', 'rows.[]', function () {
    let rows = this.get('rows')
    let columns = this.get('columns')

    let items = Ember.A([])
    rows.forEach((row) => {
      columns.forEach((column) => {
        items.pushObject(Cell.create({ row, column }))
      })
    })
    return items
  })
})
