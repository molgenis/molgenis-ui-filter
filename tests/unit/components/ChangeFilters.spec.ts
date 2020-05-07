import { mount } from '@vue/test-utils'
import { AddFilterModal } from '@/components'

describe('ChangeFilters.vue', () => {
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

  it('can add filter', (done) => {
    wrapper.find('button.btn-outline-secondary').trigger('click')
    wrapper.vm.$nextTick(() => {
      wrapper.find('.modal-footer button.btn-primary').trigger('click')
      expect(wrapper.emitted().input[0]).toEqual([ [ 'string', 'string' ] ])
      done()
    })
  })
})
