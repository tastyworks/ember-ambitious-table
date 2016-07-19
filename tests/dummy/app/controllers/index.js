import Ember from 'ember'

export default Ember.Controller.extend({
  columns: Ember.A(['value']),
  rows: Ember.A(Array(100).fill(0).map((_v, i) => {
    return { value: `Item ${i}` }
  }))
})
