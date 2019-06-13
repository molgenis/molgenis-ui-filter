import { mount } from '@vue/test-utils'
import { StringFilter } from '@/components/filters/'

describe('StringFilter.vue', () => {
  const wrapper = mount(StringFilter, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      placeholder: 'placeholder',
      value: 'value'
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('value')
  })

  it('Emits undefined when button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([undefined])
  })
})
