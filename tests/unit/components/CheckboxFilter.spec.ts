import { mount } from '@vue/test-utils'
import { CheckboxFilter } from '@/components'

describe('CheckboxFilter.vue', () => {
  const options = [{ value: 'foo', text: 'Foo' }, { value: 'bar', text: 'Bar' }, { value: 'baz', text: 'Baz' }]

  const wrapper = mount(CheckboxFilter, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      value: [],
      options
    }
  })
  const inputElements = wrapper.findAll('input')

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('can set and unset values', () => {
    inputElements.at(0).trigger('click') // select foo
    inputElements.at(1).trigger('click') // select bar
    inputElements.at(2).trigger('click') // select baz
    inputElements.at(1).trigger('click') // deselect bar
    expect(wrapper.emitted('input')[3]).toEqual([['foo', 'baz']])
  })

  it('can select all and deselect all', () => {
    const unselected = mount(CheckboxFilter, {
      stubs: {
        'font-awesome-icon': '<div />'
      },
      propsData: {
        name: 'name',
        label: 'label',
        value: [],
        options
      }
    })

    const selected = mount(CheckboxFilter, {
      stubs: {
        'font-awesome-icon': '<div />'
      },
      propsData: {
        name: 'name',
        label: 'label',
        value: ['foo'],
        options
      }
    })

    unselected.find('a.toggle-select.card-link').trigger('click') // select all
    expect(unselected.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])

    selected.find('a.toggle-select.card-link').trigger('click') // deselect all
    expect(selected.emitted('input')[0]).toEqual([undefined])
  })

  it('can hide elements based on maxVisibleOptions', () => {
    const wrapper = mount(CheckboxFilter, {
      stubs: {
        'font-awesome-icon': '<div />'
      },
      propsData: {
        name: 'name',
        label: 'label',
        maxVisibleOptions: 1,
        value: [],
        options
      }
    })

    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
    wrapper.find('a.toggle-slice.card-link').trigger('click')
    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(3)
    wrapper.find('a.toggle-slice.card-link').trigger('click')
    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
  })
})
