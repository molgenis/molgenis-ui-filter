import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'
import store from '@/store'

const VueStash = require('vue-stash')

const localVue = createLocalVue()
localVue.use(VueStash.default)

describe('StringFilter.vue', () => {
  const wrapper = shallowMount(App, {
    localVue,
    parentComponent: { data: () => ({ store }) }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
