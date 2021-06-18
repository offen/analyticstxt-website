var initialModel = window.analyticstxtParser.parse(`
# I'm an analytics.txt file
Author: Frederik Ring <frederik.ring@gmail.com>
Collects: none`)

new window.Vue({ // eslint-disable-line no-new
  el: '#wizard',
  delimiters: ['${', '}'],
  data: {
    model: initialModel[0],
    fieldAuthor: initialModel[0].Author.values.join(''),
    fieldCollects: initialModel[0].Collects.values.join('')
  },
  computed: {
    output: function () {
      var result = window.analyticstxtParser.serialize(this.model)
      if (result[1]) {
        return result[1].message
      }
      return result[0]
    }
  },
  watch: {
    fieldAuthor: function (newValue) {
      this.model.Author.values = [newValue]
    },
    fieldCollects: function (newValue) {
      this.model.Collects.values = newValue.split(',').map(function (el) {
        return el.trim()
      })
    }
  }
})
