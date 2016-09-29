import Ember from 'ember'

export default Ember.Controller.extend({
  rows: Ember.A(Array(100).fill(0).map((_v, i) => {
    return {
      index: i,
      text: `Item ${i}`
    }
  }))
})
