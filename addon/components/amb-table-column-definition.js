import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'

const CAMEL_REGEX = /([a-z\d])([A-Z]+)/g

function titleize (str) {
  return Ember.String.classify(str).replace(CAMEL_REGEX, '$1 $2')
}

export default Ember.Component.extend({
  tagName: null,
  layout: hbs(''),

  width: 100,
  contentPath: null,
  headerComponent: 'amb-table-cell',
  cellComponent: 'amb-table-cell',

  header: Ember.computed('contentPath', function () {
    let contentPath = this.get('contentPath')
    return contentPath && titleize(contentPath)
  }),

  getCellContent (item) {
    let path = this.get('contentPath')
    return Ember.get(item, path)
  },

  _onInsert: Ember.on('didInsertElement', function () {
    this.sendAction('onInsert', this)
  }),

  _onRemove: Ember.on('willRemoveElement', function () {
    this.sendAction('onRemove', this)
  })
})
