import { mount } from '@vue/test-utils'
import { StringFilter } from '@/components/filters/'

describe('StringFilter.vue', () => {
  const wrapper = mount(StringFilter, {
    propsData: {
      name: 'name',
      label: 'label',
      value: 'value'
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('value')
  })

  it('emits undefined when clear button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([undefined])
  })
})
