import Ember from 'ember'

export const HeaderCell = Ember.Object.extend({
  column: null,

  classNames: Ember.computed.readOnly('column.classNames'),
  component: Ember.computed.readOnly('column.headerComponent'),
  content: Ember.computed.readOnly('column.header')
})

export default Ember.ArrayProxy.extend({
  columns: Ember.computed.alias('content'),

  objectAtContent (idx) {
    let column = this.get('columns').objectAt(idx)
    return HeaderCell.create({ column })
  }
})
