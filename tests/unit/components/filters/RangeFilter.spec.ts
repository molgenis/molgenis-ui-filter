import { mount } from '@vue/test-utils'
import { RangeFilter } from '@/components/filters/'

describe('RangeFilter.vue', () => {
  let wrapper:any = null

  beforeEach(() => {
    wrapper = mount(RangeFilter, {
      propsData: {
        name: 'name',
        value: [1, 2]
      }
    })
  })

  it('sets value property on inner input', () => {
    const inputElement1 = wrapper.find('.range-from').element as HTMLInputElement
    expect(inputElement1.value).toBe('1')
    const inputElement2 = wrapper.find('.range-to').element as HTMLInputElement
    expect(inputElement2.value).toBe('2')
  })

  it('triggers event after value change', () => {
    wrapper.find('.range-from').setValue(5)
    wrapper.find('.range-to').setValue(20)
    wrapper.find('.range-from').trigger('change')
    wrapper.find('.range-to').trigger('change')
    expect(wrapper.emitted().input[1]).toEqual([[5, 20]])
  })

  it('can clear a value fields', () => {
    wrapper.find('.range-from').setValue(5)
    wrapper.find('.range-to').setValue(20)
    wrapper.find('.range-from').trigger('change')
    wrapper.find('.range-to').trigger('change')
    expect(wrapper.emitted().input[1]).toEqual([[5, 20]])
    wrapper.find('button.clear-from').trigger('click')
    wrapper.find('button.clear-to').trigger('click')
    expect(wrapper.emitted().input[3]).toEqual([[null, null]])
  })

  it('reacts to having its filters cleared', () => {
    expect(wrapper.vm.rangeValue).toEqual([1, 2])
    wrapper.setProps({ value: [null, null] })
    expect(wrapper.vm.rangeValue).toEqual([null, null])
  })
})
