import Ember from 'ember'
import layout from '../templates/components/amb-table-cell'

export default Ember.Component.extend({
  layout,

  cell: null,
  value: Ember.computed.readOnly('cell.value')
})
