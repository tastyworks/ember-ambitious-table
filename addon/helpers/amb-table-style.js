import Ember from 'ember'

export function style (_params, hash) {
  let values = []
  for (let key in hash) {
    let value = Ember.get(hash, key)
    if (Ember.isEmpty(value) {
      return
    }

    if (Number(value)) {
      value = `${value}px`
    }

    values.push(`${key}: ${value}`)
  }
  return Ember.String.htmlSafe(values.join(';'))
}

export default Ember.Helper.helper(style)
