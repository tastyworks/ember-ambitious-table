export function initialize(appInstance) {
  appInstance._lookupFactory('component:ember-collection').reopen({
    classNames: ['ember-collection']
  })
  appInstance._lookupFactory('component:ember-native-scrollable').reopen({
    classNames: ['ember-native-scrollable']
  })
}

export default {
  name: 'ember-ambitious-forms.ember-collection',
  initialize
}
