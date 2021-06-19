void (function (Vue, parser) {
  new Vue({ // eslint-disable-line no-new
    el: '#wizard',
    delimiters: ['<%=', '%>'],
    data: {
      fields: {
        Author: {
          type: 'input',
          value: null,
          comment: null,
          includeWhenCollectsNone: true
        },
        Collects: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          includeWhenCollectsNone: true,
          options: [
            option('None', 'none'),
            option('URL', 'url'),
            option('IP Address', 'ip-address'),
            option('Geolocation', 'geo-location'),
            option('User Agent', 'user-agent'),
            option('Fingerprint', 'fingerprint'),
            option('Device Type', 'device-type'),
            option('Referrer', 'referrer'),
            option('Visit Duration', 'visit-duration'),
            option('Custom Events', 'custom-events'),
            option('Session Recording', 'session-recording')
          ]
        }, 'none'),
        Stores: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          options: [
            option('None', 'none'),
            option('First Party Cookies', 'first-party-cookies'),
            option('Third Party Cookies', 'third-party-cookies'),
            option('Local Storage', 'local-storage'),
            option('Cache', 'cache')
          ]
        }, 'none'),
        Uses: {
          type: 'checkboxes',
          value: [],
          comment: null,
          options: [
            option('JavaScript', 'javascript'),
            option('Tracking Pixel', 'pixel'),
            option('Server Side', 'server-side'),
            option('Logs', 'logs'),
            option('Other', 'other')
          ]
        },
        Allows: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          options: [
            option('None', 'none'),
            option('Opt In', 'opt-in'),
            option('Opt Out', 'opt-out')
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
            option('None', 'none'),
            option('Do Not Track', 'do-not-track'),
            option('Global Privacy Control', 'global-privacy-control')
          ]
        }, 'none'),
        Tracks: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          optional: true,
          comment: null,
          options: [
            option('None', 'none'),
            option('Session', 'session'),
            option('Users', 'users')
          ]
        }, 'none'),
        Varies: withSingleValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          optional: true,
          options: [
            option('None', 'none'),
            option('Random', 'random'),
            option('Geographic', 'geographic'),
            option('Behavioral', 'behavioral')
          ]
        }),
        Shares: withExclusiveValue({
          type: 'checkboxes',
          value: [],
          comment: null,
          optional: true,
          options: [
            option('None', 'none'),
            option('Per User', 'per-user'),
            option('General Public', 'general-public'),
            option('Third Party', 'third-party')
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
          if (!this.applies(key)) {
            return acc
          }

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
      },
      applies: function (fieldName) {
        if (this.fields[fieldName].includeWhenCollectsNone) {
          return true
        }
        return JSON.stringify(this.fields.Collects.value) !== JSON.stringify(['none'])
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

  function option (label, value) {
    return { label: label, value: value }
  }
})(window.Vue, window.analyticstxtParser)
