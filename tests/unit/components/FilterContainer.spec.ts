import { shallowMount } from '@vue/test-utils'
import { FilterContainer } from '@/components'

describe('FilterContainer.vue', () => {
  const wrapper = shallowMount(FilterContainer, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      selections: {
        string: '',
        name: ['value2']
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
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }]
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Creates Filters from the `filters` definition', () => {
    expect(wrapper.contains("filter-card-stub[name='string']")).toBe(true)
    expect(wrapper.contains("filter-card-stub[name='checkbox']")).toBe(true)
    expect(wrapper.contains("string-filter-stub[label='String']")).toBe(true)
    expect(wrapper.contains("checkbox-filter-stub[label='Checkbox']")).toBe(true)
  })
})
