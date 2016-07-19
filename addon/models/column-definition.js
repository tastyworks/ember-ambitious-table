import Ember from 'ember'

const ColumnDefinition = Ember.Object.extend({
  width: 100,
  valuePath: null,

  getValue (item) {
    let path = this.get('valuePath')
    return Ember.get(item, path)
  }
}).reopenClass({
  build (attrs) {
    if (Ember.typeOf(attrs) === 'string') {
      return ColumnDefinition.create({ valuePath: attrs })
    }
  }
})

export default ColumnDefinition
