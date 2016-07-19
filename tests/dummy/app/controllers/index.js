import Ember from 'ember'

export default Ember.Controller.extend({
  columns: Ember.A(['name']),
  rows: [
    { name: 'Jason' },
    { name: 'Zach' },
    { name: 'Billy' },
    { name: 'Trini' },
    { name: 'Kimberly' },
    { name: 'Tommy' }
  ]
})
