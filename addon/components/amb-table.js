import Ember from 'ember'
import layout from '../templates/components/amb-table'

import ColumnDefinition from '../models/column-definition'
import Cell from '../models/cell'
import TableLayout from '../layouts/table'

export default Ember.Component.extend({
  layout,

  columns: Ember.computed({
    get () {
      return Ember.A()
    },

    set (_key, value) {
      return Ember.A(value.map(ColumnDefinition.build))
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
  }),

  tableLayout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rowsBinding: 'source.rows',
      columnsBinding: 'source.columns'
    })
  })
})
