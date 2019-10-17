import { mount } from '@vue/test-utils'
import { RangeFilter } from '@/components/filters/'

describe('RangeFilter.vue', () => {
  const wrapper = mount(RangeFilter, {
    propsData: {
      name: 'name',
      label: 'label'
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement1 = wrapper.find('.range-from').element as HTMLInputElement
    expect(inputElement1.value).toBe('')
    const inputElement2 = wrapper.find('.range-to').element as HTMLInputElement
    expect(inputElement2.value).toBe('')
  })

  it('triggers event after value change', () => {
    wrapper.find('.range-from').setValue(5)
    wrapper.find('.range-to').setValue(20)
    wrapper.find('.range-from').trigger('change')
    wrapper.find('.range-to').trigger('change')
    expect(wrapper.emitted()).toEqual({ 'input': [[[5, 20]], [[5, 20]]] })
  })
})
