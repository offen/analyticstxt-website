void (function (Vue, parser, marked) {
  new Vue({ // eslint-disable-line no-new
    el: '#explainer',
    delimiters: ['<%=', '%>'],
    data: {
      value: null
    },
    methods: {
      explain: function (e) {
        this.value = document.querySelector('#explainer-content').value
      }
    },
    computed: {
      output: function () {
        if (!this.value) {
          return ''
        }
        const [result, error] = parser.explain(this.value)
        if (error) {
          return 'The given analytics.txt file is not valid and cannot be used to generate an explanation.'
        }
        return marked.parse(result)
      }
    }
  })
})(window.Vue, window.analyticstxtParser, window.marked)
