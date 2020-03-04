import { mount } from '@vue/test-utils'
import { MultiFilter } from '@/components/filters/'

import mockData from '../../../mockdata'

describe('MultiFilter.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve(mockData.checkboxLotsOptions)
      }
    )
  }

  const propsData = {
    name: 'multi-filter',
    label: 'Filter with multiple options',
    collapsed: false,
    maxVisibleOptions: 3,
    options: optionsPromise,
    type: 'multi-filter'
  }

  const wrapper = mount(MultiFilter, { propsData })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('does not show checkbox fields when input options are not set', () => {
    const background = wrapper.find('.checkbox-list')
    expect(background.exists()).toBeFalsy()
  })

  it('shows checkbox fields when input options are set', () => {
    jest.useFakeTimers()
    wrapper.setData({ query: 'search' })
    jest.runAllTimers()
    wrapper.vm.$nextTick(() => {
      const background = wrapper.find('.checkbox-list')
      expect(background.exists()).toBeTruthy()

      const checkboxes = wrapper.findAll('input[type=checkbox]')
      expect(checkboxes.length).toEqual(propsData.maxVisibleOptions)
    })
  })

  it('shows "show {maxVisibleOptions} more" text when input options exceed maxVisibleOptions', () => {
    wrapper.setData({ inputOptions: mockData.checkboxLotsOptions })

    const text = `Show ${propsData.maxVisibleOptions} more`
    expect(wrapper.find('.card-link').text()).toEqual(text)
  })

  it('shows next three items show more is clicked', () => {
    wrapper.setData({ inputOptions: mockData.checkboxLotsOptions })
    wrapper.find('.card-link').trigger('click')

    const checkboxes = wrapper.findAll('input[type=checkbox]')

    expect(checkboxes.length).toEqual(propsData.maxVisibleOptions * 2)
  })

  it('updates the selected value to its parent', () => {
    wrapper.setData({ inputOptions: mockData.checkboxLotsOptions })

    wrapper.find('input[type=checkbox]').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
