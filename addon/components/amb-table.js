import Ember from 'ember'
import layout from '../templates/components/amb-table'

import ColumnDefinition from '../models/column-definition'
import Cell from '../models/cell'
import TableLayout from '../layouts/table'

export default Ember.Component.extend({
  layout,
  classNames: ['amb-table'],
  attributeBindings: ['style'],

  height: 'match-parent', // 'match-parent', 'wrap-content', or number

  style: Ember.computed('height', 'tableLayout.contentHeight', function () {
    let height = this.get('height')
    if (height === 'match-parent') {
      return Ember.String.htmlSafe('position: absolute; left: 0; right: 0; top: 0; bottom: 0;')
    }

    if (height === 'wrap-content') {
      height = this.get('tableLayout.contentHeight')
    }

    return Ember.String.htmlSafe(`position: relative; height: ${height}px`)
  }),

  rowHeight: null,
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
      columnsBinding: 'source.columns',
      defaultRowHeightBinding: 'source.rowHeight'
    })
  })
})
