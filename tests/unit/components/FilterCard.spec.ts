import { mount } from '@vue/test-utils'
import { FilterCard } from '@/components'

describe('FilterCard.vue', () => {
  const wrapper = mount(FilterCard, {
    propsData: {
      name: 'name',
      label: 'label',
      description: 'description'
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('can open and close', () => {
    expect(wrapper.find('small.form-text').isVisible()).toBeFalsy() // Closed
    wrapper.find('.card-header').trigger('click')
    expect(wrapper.find('small.form-text').isVisible()).toBeTruthy() // Open
    wrapper.find('.card-header').trigger('click')
    expect(wrapper.find('small.form-text').isVisible()).toBeFalsy() // Closed again
  })
})
