import { mount } from '@vue/test-utils'
import { ActiveFilters } from '@/components'

describe('ActiveFilters.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
      }
    )
  }
  const wrapper = mount(ActiveFilters, {
    propsData: {
      value: {
        string: 'blah',
        checkbox: ['red'],
        range: [-5, 5]
      },
      filters: [ {
        name: 'string',
        label: 'String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: false,
        bulkOperation: true,
        options: optionsPromise,
        type: 'checkbox-filter'
      }, {
        name: 'range',
        label: 'Range',
        min: -10,
        max: 10,
        collapsed: false,
        options: optionsPromise,
        type: 'range-filter'
      }]
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('removes filter values on click', () => {
    // @ts-ignore
    wrapper.vm.removeFilter({ key: 'string' })
    expect(wrapper.emitted().input[0][0]).toEqual({ checkbox: [ 'red' ], 'range': [-5, 5] })
    // @ts-ignore
    wrapper.vm.removeFilter({ key: 'checkbox', subKey: 'red' })
    expect(wrapper.emitted().input[1][0]).toEqual({ 'checkbox': [], 'range': [-5, 5], string: 'blah' })
  })
})
