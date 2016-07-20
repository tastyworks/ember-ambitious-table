import Ember from 'ember'

const ColumnDefinition = Ember.Object.extend({
  width: 100,
  contentPath: null,

  header: Ember.computed('contentPath', function () {
    let contentPath = this.get('contentPath')
    contentPath && Ember.String.underscore(contentPath).replace(/_/g, ' ')
  }),

  getCellContent (item) {
    let path = this.get('contentPath')
    return Ember.get(item, path)
  }
}).reopenClass({
  build (attrs) {
    if (ColumnDefinition.detectInstance(attrs)) {
      return attrs
    } else if (Ember.typeOf(attrs) === 'string') {
      return ColumnDefinition.create({ contentPath: attrs })
    } else {
      return ColumnDefinition.create(attrs)
    }
  }
})

export default ColumnDefinition
