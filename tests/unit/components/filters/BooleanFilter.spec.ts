import { mount } from '@vue/test-utils'
import { BooleanFilter } from '@/components/filters/'

describe('BooleanFilter.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve({ trueLabel: 'Public', falseLabel: 'Private' })
      }
    )
  }

  const propsData = {
    name: 'boolean-filter',
    label: 'Boolean filter',
    options: optionsPromise,
    type: 'boolean-filter'
  }

  const wrapper = mount(BooleanFilter, { propsData })
  wrapper.vm.$emit = jest.fn()

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
