import { mount } from '@vue/test-utils'
import { ActiveFilters } from '@/components'
import mockData from '../../mockdata'

describe('ActiveFilters.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve(mockData.checkboxLotsOptions)
      }
    )
  }
  const wrapper = mount(ActiveFilters, {
    propsData: {
      value: {
        string: 'blah',
        checkbox: ['red'],
        multi: ['blue', 'purple'],
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
        name: 'multi',
        label: 'Checkbox',
        collapsed: false,
        bulkOperation: true,
        options: optionsPromise,
        type: 'multi-filter'
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
    expect(wrapper.emitted().input[0][0]).toEqual({ checkbox: [ 'red' ], 'range': [-5, 5], 'multi': ['blue', 'purple'] })
    // @ts-ignore
    wrapper.vm.removeFilter({ key: 'checkbox', subKey: 'red' })
    expect(wrapper.emitted().input[1][0]).toEqual({ 'checkbox': [], 'range': [-5, 5], 'multi': ['blue', 'purple'], 'string': 'blah' })
  })
})
