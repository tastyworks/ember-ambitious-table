import Ember from 'ember'

const ColumnDefinition = Ember.Object.extend({
  width: 100,
  valuePath: null
}).reopenClass({
  build (attrs) {
    if (Ember.typeOf(attrs) === 'string') {
      return ColumnDefinition.create({ valuePath: attrs })
    }
  }
})

export default ColumnDefinition
