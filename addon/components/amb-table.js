import Ember from 'ember'
import layout from '../templates/components/amb-table'
import Grid from 'ember-collection/layouts/grid'

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
    return new Grid(100, 20)
  })
})
