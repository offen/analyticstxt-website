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
        Collects: withExclusiveValue({
          type: 'checkboxes',
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
        }, 'none'),
        Stores: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'First Party Cookies', value: 'first-party-cookies' },
            { label: 'Third Party Cookies', value: 'third-party-cookies' },
            { label: 'Local Storage', value: 'local-storage' },
            { label: 'Cache', value: 'cache' }
          ]
        }, 'none'),
        Uses: {
          type: 'checkboxes',
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
        Allows: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Opt In', value: 'opt-in' },
            { label: 'Opt Out', value: 'opt-out' }
          ]
        }, 'none'),
        Retains: {
          type: 'input',
          value: null,
          comment: null
        },
        Honors: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Do Not Track', value: 'do-not-track' },
            { label: 'Global Privacy Control', value: 'global-privacy-control' }
          ]
        }, 'none'),
        Tracks: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          optional: true,
          comment: null,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Session', value: 'session' },
            { label: 'Users', value: 'users' }
          ]
        }, 'none'),
        Varies: withSingleValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Random', value: 'random' },
            { label: 'Geographic', value: 'geographic' },
            { label: 'Behavioral', value: 'behavioral' }
          ]
        }),
        Shares: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          optional: true,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Per User', value: 'per-user' },
            { label: 'General Public', value: 'general-public' },
            { label: 'Third Party', value: 'third-party' }
          ]
        }, 'none'),
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
              case 'checkboxes':
                return { values: clone }
              case 'input':
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

  function withExclusiveValue (field, exclusiveValue) {
    field._value = field.value
    Object.defineProperty(field, 'value', {
      get () {
        return this._value
      },
      set (update) {
        var currentlyHasNone = this._value.some(function (token) {
          return token === exclusiveValue
        })
        var updateHasNone = update.some(function (token) {
          return token === exclusiveValue
        })
        if (updateHasNone && !currentlyHasNone) {
          this._value = [exclusiveValue]
          return
        }
        this._value = update.filter(function (token) {
          return token !== exclusiveValue
        })
      }
    })
    return field
  }

  function withSingleValue (field) {
    field._value = field.value
    Object.defineProperty(field, 'value', {
      get () {
        return this._value
      },
      set (update) {
        this._value = update.filter(function (token) {
          return this._value.indexOf(token) === -1
        }.bind(this))
      }
    })
    return field
  }
})(window.Vue, window.analyticstxtParser)
