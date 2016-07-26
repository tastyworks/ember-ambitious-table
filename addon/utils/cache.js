import Ember from 'ember'

export default Ember.Object.extend({
  func: null,

  init () {
    this._super()
    this._cache = {}
  },

  fetch (key) {
    if (!this._cache[key]) {
      this._cache[key] = this.func(key)
    }

    return this._cache[key]
  }
}).reopenClass({
  createWithFunc (func) {
    return this.create({ func })
  }
})
