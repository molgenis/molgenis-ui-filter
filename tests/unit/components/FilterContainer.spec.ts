import { mount } from '@vue/test-utils'
import { FilterContainer } from '@/components'

describe('FilterContainer.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
      }
    )
  }
  const options = {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      value: {
        string: 'blah',
        checkbox: ['red']
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
        name: 'checkbox2',
        label: 'Checkbox',
        collapsed: false,
        bulkOperation: true,
        options: optionsPromise,
        type: 'checkbox-filter'
      }],
      filtersShown: ['string', 'checkbox']
    }
  }

  let wrapper = mount(FilterContainer, options)

  beforeEach(() => {
    wrapper = mount(FilterContainer, options)
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('consolidates all filter output and sends them via input event', () => {
    wrapper.find('input[name="string"]').setValue('test')
    wrapper.find('input[value="red"]').trigger('click')
    expect(wrapper.emitted().input).toEqual([
      [{ 'checkbox': ['red'], 'string': 'test' }],
      [{ 'checkbox': undefined, 'string': 'blah' }]
    ])
  })

  it('cannot remove filters by default', () => {
    expect(wrapper.find('.remove-button').exists()).toBe(false)
  })

  it('can remove filters when editable', () => {
    wrapper.setProps({ canEdit: true })
    wrapper.find('.remove-button').trigger('click')
    expect(wrapper.emitted().update).toEqual([[['checkbox']]])
    expect(wrapper.emitted().input).toEqual([[{ checkbox: [ 'red' ] }]])
  })

  it('cannot add filters by default', () => {
    expect(wrapper.find('.add-button').exists()).toBe(false)
  })

  it('can add filters when editable', (done) => {
    wrapper.setProps({ canEdit: true })
    wrapper.find('.add-button').trigger('click')
    wrapper.vm.$nextTick(() => {
      wrapper.find('#modal-add-filter select[name=filter]').setValue('checkbox2')
      wrapper.find('#modal-add-filter .modal-footer button.btn-primary').trigger('click')
      expect(wrapper.emitted().update[0]).toEqual([ [ 'string', 'checkbox', 'checkbox2' ] ])
      done()
    })
  })

  it('shows the filters in the correct order ( based on filtersToShow ) ', () => {
    expect((wrapper.vm as any).listOfVisibleFilters[0].label).toBe('String')
    expect((wrapper.vm as any).listOfVisibleFilters[1].label).toBe('Checkbox')
    wrapper.setData({ filtersToShow: ['checkbox', 'string'] }) // flip order
    expect((wrapper.vm as any).listOfVisibleFilters[0].label).toBe('Checkbox')
    expect((wrapper.vm as any).listOfVisibleFilters[1].label).toBe('String')
  })
})
