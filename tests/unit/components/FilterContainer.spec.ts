import { mount } from '@vue/test-utils'
import { FilterContainer } from '@/components'

describe('FilterContainer.vue', () => {
  const wrapper = mount(FilterContainer, {
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
        collapsed: false,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }]
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('consolidates all filter output and sends them via input event', () => {
    wrapper.find('input[name="string"]').setValue('test')
    wrapper.find('input[value="red"]').trigger('click')
    expect(wrapper.emitted().input).toEqual([ [ { string: 'test' } ], [ { checkbox: [ 'red' ] } ] ])
  })
})
