void (function (Vue, parser) {
  new Vue({ // eslint-disable-line no-new
    el: '#wizard',
    delimiters: ['<%', '%>'],
    data: {
      fields: {
        Author: {
          isInput: true,
          value: null,
          toModel: function (value) {
            return { values: [value].filter(Boolean) }
          }
        },
        Collects: {
          isMultiValue: true,
          value: [],
          toModel: function (value) {
            return { values: value }
          },
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
          isMultiValue: true,
          value: [],
          toModel: function (value) {
            return { values: value }
          },
          options: [
            { label: 'None', value: 'none' },
            { label: 'First Party Cookies', value: 'first-party-cookies' },
            { label: 'Third Party Cookies', value: 'third-party-cookies' },
            { label: 'Local Storage', value: 'local-storage' },
            { label: 'Cache', value: 'cache' }
          ]
        },
        Varies: {
          isSingleValue: true,
          value: null,
          toModel: function (value) {
            return { values: [value].filter(Boolean) }
          },
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
          var asModel = this.fields[key].toModel(clone)
          if (asModel.values && asModel.values.length) {
            acc[key] = asModel
          }
          return acc
        }.bind(this), {})
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
