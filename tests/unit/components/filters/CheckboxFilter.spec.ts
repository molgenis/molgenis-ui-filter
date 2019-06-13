import { mount } from '@vue/test-utils'
import { CheckboxFilter } from '@/components/filters/'

describe('CheckboxFilter.vue', () => {
  const wrapper = mount(CheckboxFilter, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      options: [{ value: 'foo', text: 'Foo' }, { value: 'bar', text: 'Bar' }, { value: 'baz', text: 'Baz' }]
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Can set and unset values', () => {
    const inputElements = wrapper.findAll('input')
    inputElements.at(0).trigger('click') // select foo
    inputElements.at(1).trigger('click') // select bar
    inputElements.at(2).trigger('click') // select baz
    inputElements.at(1).trigger('click') // deselect bar
    expect(wrapper.emitted('input')[3]).toEqual([['foo', 'baz']])
    inputElements.at(2).trigger('click') // select all
    wrapper.find('a.toggle-select.card-link').trigger('click')
    expect(wrapper.emitted('input')[5]).toEqual([['foo', 'bar', 'baz']])
  })
})
