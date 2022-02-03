void (function (Vue, parser, marked) {
  new Vue({ // eslint-disable-line no-new
    el: '#explainer',
    delimiters: ['<%=', '%>'],
    data: {
      value: null,
      output: null,
      decorateContent: {
        'p': ['mt4', 'pa1']
      }
    },
    methods: {
      explain: function () {
        this.output = (() => {
          if (!this.value) {
            return ''
          }
          const [result, error] = parser.explain(this.value)
          if (error) {
            return 'The given analytics.txt file is not valid and cannot be used to generate an explanation.'
          }
          const html = marked.parse(result)
          const container = document.createElement('div')
          container.innerHTML = html
          for (const [selector, decorator] of Object.entries(this.decorateContent)) {
            for (const element of container.querySelectorAll(selector)) {
              element.classList.add.apply(element.classList, decorator)
            }
          }
          return container.innerHTML
        })()
      }
    }
  })
})(window.Vue, window.analyticstxtParser, window.marked)
