import { mount } from '@vue/test-utils'
import { FilterCard } from '@/components'

describe('FilterCard.vue', () => {
  const startOpen = mount(FilterCard, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      description: 'description',
      collapsed: false
    }
  })

  const startClosed = mount(FilterCard, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      description: 'description'
    }
  })

  const noCollapsable = mount(FilterCard, {
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      description: 'description',
      collapsable: false,
      collapsed: true
    }
  })

  it('matches the snapshot', () => {
    expect(startClosed.element).toMatchSnapshot()
  })

  it('can open and close (starts closed)', () => {
    expect(startClosed.find('small.form-text').isVisible()).toBeFalsy() // Closed
    startClosed.find('.card-header').trigger('click')
    expect(startClosed.find('small.form-text').isVisible()).toBeTruthy() // Open
    startClosed.find('.card-header').trigger('click')
    expect(startClosed.find('small.form-text').isVisible()).toBeFalsy() // Closed again
  })

  it('can open and close (starts open)', () => {
    expect(startOpen.find('small.form-text').isVisible()).toBeTruthy() // Open
    startOpen.find('.card-header').trigger('click')
    expect(startOpen.find('small.form-text').isVisible()).toBeFalsy() // Closed
    startOpen.find('.card-header').trigger('click')
    expect(startOpen.find('small.form-text').isVisible()).toBeTruthy() // Open again
  })

  it('setting collapsable to false wil force the card open al the time', () => {
    expect(noCollapsable.find('small.form-text').isVisible()).toBeTruthy() // Closed
    noCollapsable.find('.card-header').trigger('click')
    expect(noCollapsable.find('small.form-text').isVisible()).toBeTruthy() // Open
    noCollapsable.find('.card-header').trigger('click')
    expect(noCollapsable.find('small.form-text').isVisible()).toBeTruthy() // Closed again
  })
})
