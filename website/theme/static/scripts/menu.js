void (function (Vue) {
  new Vue({ // eslint-disable-line no-new
    el: '#navigation',
    data: {
      active: false
    },
    methods: {
      toggle: function () {
        this.active = !this.active
      }
    }
  })
})(window.Vue)
