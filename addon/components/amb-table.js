import Ember from 'ember'
import layout from '../templates/components/amb-table'
import { formatPixelStyle } from 'ember-collection/utils/style-generators'

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

  cellLayout: Ember.computed(function () {
    let component = this

    return {
      /* Return an object that describes the size of the content area */
      contentSize (clientWidth, clientHeight) {
        return { width: clientWidth, height: clientHeight }
      },

      /* Return the index of the first item shown.  */
      indexAt (_offsetX, _offsetY, _clientWidth, _clientHeight) {
        return 0
      },

      /* Return the number of items to display */
      count (_offsetX, _offsetY, _width, _height) {
        return component.get('items.length')
      },

      /* Return the css that should be used to set the size and position of the item.  */
      formatItemStyle (_itemIndex, _clientWidth, _clientHeight) {
        let pos = { x: 0, y: 0 }
        let width = 100
        let height = 20
        return formatPixelStyle(pos, width, height)
      }
    }
  })
})
