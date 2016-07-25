import Ember from 'ember'
import { formatPixelStyle } from 'ember-collection/utils/style-generators'

export default Ember.Object.extend({
  rows: null,
  columns: null,

  defaultRowHeight: null,

  clientWidth: null,
  clientHeight: null,

  contentWidth: Ember.computed.sum('_columnWidths'),
  contentHeight: Ember.computed.sum('_rowHeights'),

  horizontalScroll: Ember.computed('contentWidth', 'clientWidth', function () {
    return this.get('contentWidth') > this.get('clientWidth')
  }),

  verticalScroll: Ember.computed('contentHeight', 'clientHeight', function () {
    return this.get('contentHeight') > this.get('clientHeight')
  }),

  /* Return an object that describes the size of the content area */
  contentSize (clientWidth, clientHeight) {
    this.setProperties({ clientWidth, clientHeight })
    return {
      width: this.get('contentWidth'),
      height: this.get('contentHeight')
    }
  },

  /* Return the index of the first item shown.  */
  indexAt (_offsetX, offsetY, _clientWidth, _clientHeight) {
    let r = this._findR(offsetY)
    return this._toI(r, 0)
  },

  /* Return the number of items to display */
  count (_offsetX, offsetY, _width, height) {
    let rStart = this._findR(offsetY)
    let rEnd = this._findR(offsetY + height) + 1
    return (rEnd - rStart) * this.get('columns.length')
  },

  /* Return the css that should be used to set the size and position of the item.  */
  formatItemStyle (itemIndex, _clientWidth, _clientHeight) {
    let {r, c} = this._toRC(itemIndex)
    let pos = {
      x: this.get(`_columnOffsets.${c}`),
      y: this.get(`_rowOffsets.${r}`)
    }
    let width = this.get(`_columnWidths.${c}`)
    let height = this.get(`_rowHeights.${r}`)
    return formatPixelStyle(pos, width, height)
  },

  _columnOffsets: Ember.computed('_columnWidths.[]', function () {
    let widths = this.get('_columnWidths')
    let offsets = Ember.A([])
    let last = 0
    widths.forEach((width) => {
      offsets.pushObject(last)
      last += width
    })
    return offsets
  }),

  _rowOffsets: Ember.computed('_rowHeights.[]', function () {
    let heights = this.get('_rowHeights')
    let offsets = Ember.A([])
    let last = 0
    heights.forEach((height) => {
      offsets.pushObject(last)
      last += height
    })
    return offsets
  }),

  _columnWidths: Ember.computed.mapBy('columns', 'width'),

  _rowHeights: Ember.computed.map('rows.@each.rowHeight', function (item) {
    return Ember.get(item, 'rowHeight') || this.get('defaultRowHeight') || 20
  }),

  _findR (scrollOffset) {
    let rowOffsets = this.get('_rowOffsets')
    for (let r = 0; r < rowOffsets.length; r++) {
      if (rowOffsets[r] > scrollOffset) {
        return r - 1
      }
    }
    return rowOffsets.length - 1
  },

  _toRC (itemIndex) {
    let numColumns = this.get('columns.length')
    let r = Math.floor(itemIndex / numColumns)
    let c = itemIndex % numColumns
    return {r, c}
  },

  _toI (r, c) {
    return r * this.get('columns.length') + c
  }
})
