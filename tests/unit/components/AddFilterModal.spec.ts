import { mount } from '@vue/test-utils'
import { AddFilterModal } from '@/components'

describe('AddFilterModal.vue', () => {
  const wrapper = mount(AddFilterModal, {
    propsData: {
      filters: [ {
        name: 'string',
        label: 'String String String String String',
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
      }],
      value: ['string']
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('matches snapshot', (done) => {
    wrapper.find('button.btn-outline-secondary').trigger('click')
    wrapper.vm.$nextTick(() => {
      wrapper.find('.modal-footer button.btn-primary').trigger('click')
      expect(wrapper.emitted().input[0]).toEqual([ [ 'string', 'string' ] ])
      done()
    })
  })
})
