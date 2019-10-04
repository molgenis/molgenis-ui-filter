import { mount } from '@vue/test-utils'
import { RangeFilter } from '@/components/filters/'

describe('RangeFilter.vue', () => {
  const wrapper = mount(RangeFilter, {
    propsData: {
      name: 'name',
      label: 'label',
      value: [1, 1],
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement1 = wrapper.find('.range-from').element as HTMLInputElement
    expect(parseInt(inputElement1.value, 10)).toBe(Number.MIN_SAFE_INTEGER)
    const inputElement2 = wrapper.find('.range-to').element as HTMLInputElement
    expect(parseInt(inputElement2.value, 10)).toBe(Number.MAX_SAFE_INTEGER)
  })
})
