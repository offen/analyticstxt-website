void (function (Vue, parser) {
  new Vue({ // eslint-disable-line no-new
    el: '#explainer',
    delimiters: ['<%=', '%>'],
    data: {
      value: null,
      result: null,
      error: null,
      expanded: []
    },
    methods: {
      toggle: function (index) {
        if (this.isExpanded(index)) {
          this.expanded = this.expanded.filter(function (el) {
            return el !== index
          })
        } else {
          this.expanded.push(index)
        }
      },
      isExpanded: function (index) {
        return this.expanded.indexOf(index) !== -1
      },
      explain: function () {
        if (!this.value) {
          return
        }
        const [result, error] = parser.explain(this.value, { format: v => v })
        if (Array.isArray(result)) {
          result[0] = {
            headline: 'Author',
            body: [result[0].body[1]]
          }
        }
        this.error = error
          ? 'The given analytics.txt file is not valid and cannot be used to generate an explanation.'
          : null
        this.result = result
        this.expanded = [1]
      }
    }
  })
})(window.Vue, window.analyticstxtParser)
