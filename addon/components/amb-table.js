import Ember from 'ember'
import layout from '../templates/components/amb-table'

import TableLayout from '../layouts/table'

export default Ember.Component.extend({
  layout,

  columns: Ember.A(),
  items: Ember.computed('columns.[]', 'rows.[]', function () {
    let rows = this.get('rows')
    let columns = this.get('columns')

    let items = Ember.A([])
    rows.forEach((row) => {
      columns.forEach((column) => {
        items.pushObject(Ember.Object.create({ row, column, value: Ember.get(row, column) }))
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
