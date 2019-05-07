import Vue from 'vue'
import App from './App.vue'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faEdit, faTrash, faPlay, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(i18n, {
  namespace: ['filters'],
  callback () {
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
