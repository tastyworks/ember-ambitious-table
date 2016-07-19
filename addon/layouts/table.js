import Ember from 'ember'
import { formatPixelStyle } from 'ember-collection/utils/style-generators'

export default Ember.Object.extend({
  rows: null,
  columns: null,

  /* Return an object that describes the size of the content area */
  contentSize (clientWidth, clientHeight) {
    return {
      width: this.get('_columnOffsets.lastObject'),
      height: this.get('_rowOffsets.lastObject')
    }
  },

  /* Return the index of the first item shown.  */
  indexAt (_offsetX, _offsetY, _clientWidth, _clientHeight) {
    // TODO: don't render everything
    return 0
  },

  /* Return the number of items to display */
  count (_offsetX, _offsetY, _width, _height) {
    // TODO: don't render everything
    return this.get('rows.length') * this.get('columns.length')
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
    let offsets = Ember.A([0])
    let last = 0
    widths.forEach((width) => {
      last += width
      offsets.pushObject(last)
    })
    return offsets
  }),

  _rowOffsets: Ember.computed('_rowHeights.[]', function () {
    let heights = this.get('_rowHeights')
    let offsets = Ember.A([0])
    let last = 0
    heights.forEach((height) => {
      last += height
      offsets.pushObject(last)
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

  _toRC (itemIndex) {
    if (itemIndex === 0) {
      return { r: 0, c: 0 }
    }

    let numColumns = this.get('columns.length')
    let r = Math.floor(itemIndex / numColumns)
    let c = itemIndex % r
    return {r, c}
  }
})
