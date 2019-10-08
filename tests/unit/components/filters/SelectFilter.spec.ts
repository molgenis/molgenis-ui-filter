import { mount } from '@vue/test-utils'
import { SelectFilter } from '@/components/filters/'

describe('SelectFilter.vue', () => {
  const wrapper = mount(SelectFilter, {
    propsData: {
      name: 'name',
      label: 'label',
      value: 'default',
      options: [{ value: 'default', text: 'Default' }, { value: 'alt', text: 'Alternative' }]
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement = wrapper.find('select').element as HTMLInputElement
    expect(inputElement.value).toBe('default')
  })

  it('emits undefined when button is clicked', () => {
    wrapper.find('select').setValue('alt')
    expect(wrapper.emitted().input[0]).toEqual([ 'alt' ])
  })
})
