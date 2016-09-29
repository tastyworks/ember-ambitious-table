import Ember from 'ember'
import layout from '../templates/components/amb-table'

import { style } from '../helpers/amb-table-style'

const SCROLLBAR_SIZE = 30

export default Ember.Component.extend({
  layout,
  classNames: ['amb-table'],
  classNameBindings: ['heightClass'],
  attributeBindings: ['style'],

  showHeaders: true,
  headerHeight: 30,

  height: 'match-parent', // 'match-parent', 'wrap-content', or number

  scrollLeft: 0,
  scrollTop: 0,

  heightClass: Ember.computed('height', function () {
    let height = this.get('height')
    if (Number(height)) {
      return 'amb-table-fixed-height'
    } else {
      return `amb-table-${height}`
    }
  }),

  contentHeight: Ember.computed('showHeaders', 'headerHeight', 'bodyHeight', 'horizontalScroll', function () {
    let height = this.get('bodyHeight')

    if (this.get('horizontalScroll')) {
      height += SCROLLBAR_SIZE
    }

    if (this.get('showHeaders')) {
      height += this.get('headerHeight')
    }

    return height
  }),

  heightStyle: Ember.computed('height', 'contentHeight', function () {
    let height = this.get('height')
    if (height === 'match-parent') {
      return
    }

    if (height === 'wrap-content') {
      return this.get('contentHeight')
    }
  }),

  style: Ember.computed('heightStyle', function () {
    let height = this.get('heightStyle')
    if (height) {
      return style([], { height })
    }
  }),

  rows: null,

  fixedColumns: Ember.computed(() => Ember.A()),
  scrollColumns: Ember.computed(() => Ember.A()),

  _fixedWidths: Ember.computed.mapBy('fixedColumns', 'width'),
  fixedWidth: Ember.computed.sum('_fixedWidths'),

  actions: {
    scrollBodyLayoutChange (layout) {
      this.set('bodyHeight', layout.get('contentHeight'))
      this.set('horizontalScroll', layout.get('horizontalScroll'))
    },

    scrollChange (scrollLeft, scrollTop) {
      this.setProperties({ scrollLeft, scrollTop })
    },

    headerClick (item) {
      this.sendAction('headerClick', item)
    },

    cellClick (item) {
      this.sendAction('cellClick', item)
    },

    insertColumn (columns, column) {
      Ember.run.schedule('afterRender', () => {
        columns.pushObject(column)
      })
    },

    removeColumn (columns, column) {
      Ember.run.schedule('afterRender', () => {
        columns.removeObject(column)
      })
    },
  }
})
