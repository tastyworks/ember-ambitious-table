import Ember from 'ember'
import { formatPixelStyle } from 'ember-collection/utils/style-generators'

export default Ember.Object.extend({
  rows: null,
  columns: null,

  contentWidth: Ember.computed.sum('_columnWidths'),
  contentHeight: Ember.computed.sum('_rowHeights'),

  /* Return an object that describes the size of the content area */
  contentSize (_clientWidth, _clientHeight) {
    return {
      width: this.get('contentWidth'),
      height: this.get('contentHeight')
    }
  },

  /* Return the index of the first item shown.  */
  indexAt (_offsetX, offsetY, _clientWidth, _clientHeight) {
    let rowOffsets = this.get('_rowOffsets')
    let r = this._findR(offsetY)
    return this._toI(r, 0)
  },

  /* Return the number of items to display */
  count (_offsetX, offsetY, _width, height) {
    let rowOffsets = this.get('_rowOffsets')
    let rStart = this._findR(offsetY)
    let rEnd = this._findR(offsetY + height)
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

  // _columnWidths: Ember.computed.map('columns.@each.width', function (item) {
  _columnWidths: Ember.computed.map('columns.[]', function (item) {
    return Ember.get(item, 'width') || 100
  }),

  // _rowHeights: Ember.computed.map('rows.@each.height', function (item) {
  _rowHeights: Ember.computed.map('rows.[]', function (item) {
    return Ember.get(item, 'height') || 20
  }),

  _findR (scrollOffset) {
    let rowOffsets = this.get('_rowOffsets')
    for (let r = 0; r < rowOffsets.length; r++) {
      if (rowOffsets[r] > scrollOffset) {
        return r - 1
      }
    }
    return rowOffsets.length
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
