void (function (Vue, parser) {
  new Vue({ // eslint-disable-line no-new
    el: '#wizard',
    delimiters: ['<%=', '%>'],
    data: {
      fields: {
        Author: {
          type: 'input',
          value: null,
          comment: null
        },
        Collects: {
          type: 'multiple-choice',
          value: [],
          comment: null,
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
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'First Party Cookies', value: 'first-party-cookies' },
            { label: 'Third Party Cookies', value: 'third-party-cookies' },
            { label: 'Local Storage', value: 'local-storage' },
            { label: 'Cache', value: 'cache' }
          ]
        },
        Uses: {
          type: 'multiple-choice',
          value: [],
          comment: null,
          options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'Tracking Pixel', value: 'pixel' },
            { label: 'Server Side', value: 'server-side' },
            { label: 'Logs', value: 'logs' },
            { label: 'Other', value: 'other' }
          ]
        },
        Allows: {
          type: 'multiple-choice',
          value: [],
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Opt In', value: 'opt-in' },
            { label: 'Opt Out', value: 'opt-outs' }
          ]
        },
        Retains: {
          type: 'input',
          value: null,
          comment: null
        },
        Honors: {
          type: 'multiple-choice',
          value: [],
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Do Not Track', value: 'do-not-track' },
            { label: 'Global Privacy Control', value: 'global-privacy-control' }
          ]
        },
        Tracks: {
          type: 'multiple-choice',
          value: [],
          optional: true,
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Session', value: 'session' },
            { label: 'Users', value: 'users' }
          ]
        },
        Varies: {
          type: 'select',
          value: null,
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Random', value: 'random' },
            { label: 'Geographic', value: 'geographic' },
            { label: 'Behavioral', value: 'behavioral' }
          ]
        },
        Shares: {
          type: 'multiple-choice',
          value: [],
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Per User', value: 'per-user' },
            { label: 'General Public', value: 'general-public' },
            { label: 'Third Party', value: 'third-party' }
          ]
        },
        Implements: {
          type: 'input',
          value: null,
          comment: null,
          optional: true
        },
        Deploys: {
          type: 'input',
          value: null,
          comment: null,
          optional: true
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
                if (clone === null) {
                  return []
                }
                return {
                  values: clone
                    .split(',')
                    .map(function (s) { return s.trim() })
                    .filter(Boolean)
                }
            }
          }.bind(this))()

          if (this.fields[key].comment) {
            asModel.comments = wrap(this.fields[key].comment, 78)
          }

          if (asModel.values && asModel.values.length) {
            acc[key] = asModel
          }

          return acc
        }.bind(this), {})
      },
      resetSelect: function (key) {
        this.fields[key].value = null
      },
      toggleComment: function (key) {
        if (this.fields[key].comment === null) {
          this.fields[key].comment = ''
          return
        }
        this.fields[key].comment = null
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

  function wrap (str, length) {
    return str.split(' ')
      .reduce(function (acc, word) {
        var tail = acc[acc.length - 1]
        if (tail.join(' ').length + word.length < length) {
          tail.push(word)
          return acc
        }
        acc.push([word])
        return acc
      }, [[]])
      .map(function (words) {
        return words.join(' ')
      })
  }
})(window.Vue, window.analyticstxtParser)
