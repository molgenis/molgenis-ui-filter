import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('StringFilter.vue', () => {
  const wrapper = shallowMount(App)

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
