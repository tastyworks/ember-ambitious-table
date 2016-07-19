import Ember from 'ember'
import layout from '../templates/components/amb-table-cell'

export default Ember.Component.extend({
  layout,
  classNames: ['amb-table-cell'],

  cell: null,

  content: Ember.computed.readOnly('cell.content')
})
