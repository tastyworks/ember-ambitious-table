export function initialize (appInstance) {
  appInstance.factoryFor('component:ember-collection').class.reopen({
    classNames: ['ember-collection']
  })
  appInstance.factoryFor('component:ember-native-scrollable').class.reopen({
    classNames: ['ember-native-scrollable']
  })
}

export default {
  name: 'ember-ambitious-forms.ember-collection',
  initialize
}
