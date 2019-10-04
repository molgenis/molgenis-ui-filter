import { mount } from '@vue/test-utils'
import { NumberFilter } from '@/components/filters/'

describe('NumberFilter.vue', () => {
  const wrapper = mount(NumberFilter, {
    propsData: {
      name: 'name',
      label: 'label'
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('0')
  })

  it('triggers event after value change', () => {
    wrapper.find('input').setValue(20)
    expect(wrapper.emitted()).toEqual({ input: [ [ 20 ] ] })
  })
})
