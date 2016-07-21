import Ember from 'ember'
import layout from '../templates/components/amb-table-section'

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  classNames: 'amb-table-section',
  cells: null
})
