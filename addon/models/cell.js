import Ember from 'ember'

export default Ember.Object.extend({
  row: null,
  column: null,

  classNames: Ember.computed.union('row.classNames', 'column.classNames'),

  component: Ember.computed('column.cellComponent', function () {
    return this.get('column.cellComponent') || 'amb-table-cell'
  }),

  value: Ember.computed('row', 'column.valuePath', function () {
    let valuePath = this.get('column.valuePath')
    return Ember.get(this.get('row'), valuePath)
  })
})
