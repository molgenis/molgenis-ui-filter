import Vue from 'vue'
import App from './App.vue'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

// @ts-ignore
import VueStash from 'vue-stash'
import store from './store'

Vue.use(VueStash)

Vue.config.productionTip = false

Vue.use(i18n, {
  namespace: ['filters'],
  callback () {
    new Vue({
      // @ts-ignore
      data: { store },
      render: h => h(App)
    }).$mount('#app')
  }
})
