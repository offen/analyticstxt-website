var initialModel = {
  Author: { values: [] },
  Collects: { values: [] },
  Stores: { values: [] }
}

new window.Vue({ // eslint-disable-line no-new
  el: '#wizard',
  delimiters: ['<%', '%>'],
  data: {
    model: initialModel,
    options: {
      Collects: [
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
      ],
      Stores: [
        { label: 'None', value: 'none' },
        { label: 'First Party Cookies', value: 'first-party-cookies' },
        { label: 'Third Party Cookies', value: 'third-party-cookies' },
        { label: 'Local Storage', value: 'local-storage' },
        { label: 'Cache', value: 'cache' }
      ]
    },
    fieldAuthor: initialModel.Author.values.join(''),
    fieldCollects: initialModel.Collects.values,
    fieldStores: initialModel.Stores.values
  },
  computed: {
    output: function () {
      var result = window.analyticstxtParser.serialize(this.model, { lax: true })
      return (result[1] && result[1].message) || result[0]
    },
    error: function () {
      var result = window.analyticstxtParser.serialize(this.model)
      return result[1]
    }
  },
  watch: {
    fieldAuthor: function (newValue) {
      this.model.Author.values = [newValue]
    },
    fieldCollects: function (newValue) {
      this.model.Collects.values = newValue
    },
    fieldStores: function (newValue) {
      this.model.Stores.values = newValue
    }
  }
})
