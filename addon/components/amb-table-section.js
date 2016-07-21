import Ember from 'ember'
import layout from '../templates/components/amb-table-section'

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  classNames: 'amb-table-section',
  cells: null,

  _didInsertElement: Ember.on('didInsertElement', function () {
    this._contentLayoutChange()
  }),

  _contentLayoutChange: Ember.observer('cells.layout.contentWidth', 'cells.layout.contentHeight', function () {
    Ember.run.debounce(this, this._doContentLayoutChange, 100)
  }),

  _doContentLayoutChange () {
    this.sendAction('contentLayoutChange', this.get('cells.layout'))
  }
})
