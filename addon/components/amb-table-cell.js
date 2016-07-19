import Ember from 'ember'
import layout from '../templates/components/amb-table-cell'

export default Ember.Component.extend({
  layout,
  classNames: ['amb-table-cell'],

  cell: null,

  value: Ember.computed.readOnly('cell.value')
})
