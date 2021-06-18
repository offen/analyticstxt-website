void (function (Vue, parser) {
  new Vue({ // eslint-disable-line no-new
    el: '#wizard',
    delimiters: ['<%', '%>'],
    data: {
      fields: {
        Author: {
          type: 'input',
          value: null
        },
        Collects: {
          type: 'multiple-choice',
          value: [],
          options: [
            { label: 'None', value: 'none' },
            { label: 'URL', value: 'url' },
            { label: 'IP Address', value: 'ip-address' },
            { label: 'Geolocation', value: 'geo-location' },
            { label: 'User Agent', value: 'user-agent' },
            { label: 'Fingerprint', value: 'fingerprint' },
            { label: 'Device Type', value: 'device-type' },
            { label: 'Referrer', value: 'referrer' },
            { label: 'Visit Duration', value: 'visit-duration' },
            { label: 'Custom Events', value: 'custom-events' },
            { label: 'Session Recording', value: 'session-recording' }
          ]
        },
        Stores: {
          type: 'multiple-choice',
          value: [],
          options: [
            { label: 'None', value: 'none' },
            { label: 'First Party Cookies', value: 'first-party-cookies' },
            { label: 'Third Party Cookies', value: 'third-party-cookies' },
            { label: 'Local Storage', value: 'local-storage' },
            { label: 'Cache', value: 'cache' }
          ]
        },
        Varies: {
          type: 'select',
          value: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Random', value: 'random' },
            { label: 'Geographic', value: 'geographic' },
            { label: 'Behavioral', value: 'behavioral' }
          ]
        }
      }
    },
    methods: {
      model: function () {
        return Object.keys(this.fields).reduce(function (acc, key) {
          var clone = JSON.parse(JSON.stringify(this.fields[key].value))
          var asModel = (function () {
            switch (this.fields[key].type) {
              case 'multiple-choice':
                return { values: clone }
              case 'input':
              case 'select':
                return { values: [clone].filter(Boolean) }
            }
          }.bind(this))()
          if (asModel.values && asModel.values.length) {
            acc[key] = asModel
          }
          return acc
        }.bind(this), {})
      },
      resetSingleValue: function (fieldKey) {
        this.fields[fieldKey].value = null
      }
    },
    computed: {
      output: function () {
        var result = parser.serialize(this.model(), { lax: true })
        return (result[1] && result[1].message) || result[0]
      },
      error: function () {
        var result = parser.serialize(this.model())
        return result[1]
      }
    }
  })
})(window.Vue, window.analyticstxtParser)
