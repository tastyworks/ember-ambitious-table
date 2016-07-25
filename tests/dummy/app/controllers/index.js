import Ember from 'ember'

export default Ember.Controller.extend({
  columns: Ember.A([
    { header: 'Number', contentPath: 'index', fixed: true },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 },
    { contentPath: 'text', width: 300 }
  ]),
  rows: Ember.A(Array(100).fill(0).map((_v, i) => {
    return {
      index: i,
      text: `Item ${i}`
    }
  }))
})
