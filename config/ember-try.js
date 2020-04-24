module.exports = function() {
  return {
    scenarios: [
      {
        name: 'default',
        bower: {
          dependencies: { }
        }
      },
      {
        name: 'ember-2.13',
        bower: {
          dependencies: {
            'ember': 'components/ember#2.13.4'
          },
          resolutions: {
            'ember': '2.13.4'
          }
        }
      },
      {
        name: 'ember-2.18',
        allowedToFail: true,
        bower: {
          dependencies: {
            'ember': 'components/ember#2.18.2'
          },
          resolutions: {
            'ember': '2.18.2'
          }
        }
      }
    ]
  };
};
