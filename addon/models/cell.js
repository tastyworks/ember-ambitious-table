import Ember from 'ember'

export default Ember.Object.extend({
  row: null,
  column: null,

  classNames: Ember.computed.union('row.classNames', 'column.classNames'),

  component: Ember.computed('column.cellComponent', function () {
    return this.get('column.cellComponent') || 'amb-table-cell'
  }),

  content: Ember.computed('row', 'column.contentPath', function () {
    let column = this.get('column')
    return column.getCellContent(this.get('row'))
  })
})
