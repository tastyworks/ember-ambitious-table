import Ember from 'ember'
import layout from '../templates/components/amb-table'

import ColumnDefinition from '../models/column-definition'
import Cell from '../models/cell'
import TableLayout from '../layouts/table'

const SCROLLBAR_SIZE = 30

export default Ember.Component.extend({
  layout,
  classNames: ['amb-table'],
  classNameBindings: ['heightClass'],
  attributeBindings: ['style'],

  height: 'match-parent', // 'match-parent', 'wrap-content', or number

  heightClass: Ember.computed('height', function () {
    let height = this.get('height')
    if (Number(height)) {
      return 'amb-table-fixed-height'
    } else {
      return `amb-table-${height}`
    }
  }),

  style: Ember.computed('height', 'scrollTableLayout.contentHeight', function () {
    let height = this.get('height')
    if (height === 'match-parent') {
      return
    }

    if (height === 'wrap-content') {
      height = this.get('scrollTableLayout.contentHeight')
      if (this.get('scrollTableLayout.horizontalScroll')) {
        height += SCROLLBAR_SIZE
      }
    }

    return Ember.String.htmlSafe(`height: ${height}px`)
  }),

  fixedWidthCss: Ember.computed('fixedTableLayout.contentWidth', function () {
    let width = this.get('fixedTableLayout.contentWidth')
    return Ember.String.htmlSafe(`width: ${width}px`)
  }),

  rows: null,
  columns: Ember.computed({
    get (_key) {
      return Ember.A()
    },

    set (_key, value) {
      return Ember.A(value.map(ColumnDefinition.build))
    }
  }),

  fixedColumns: Ember.computed.filterBy('columns', 'fixed'),
  scrollColumns: Ember.computed.filterBy('columns', 'fixed', false),

  fixedTableLayout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rowsBinding: 'source.rows',
      columnsBinding: 'source.fixedColumns',
      defaultRowHeightBinding: 'source.rowHeight'
    })
  }),

  scrollTableLayout: Ember.computed(function () {
    return TableLayout.create({
      source: this,
      rowsBinding: 'source.rows',
      columnsBinding: 'source.scrollColumns',
      defaultRowHeightBinding: 'source.rowHeight'
    })
  })
})
