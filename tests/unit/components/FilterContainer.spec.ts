import { createLocalVue, mount } from '@vue/test-utils'
import { FilterContainer } from '@/components'
import BootstrapVue from 'bootstrap-vue'
import state from '@/store'

const VueStash = require('vue-stash')

describe('FilterContainer.vue', () => {
  let wrapper:any
  let store:any

  const localVue = createLocalVue()
  localVue.use(VueStash.default)
  localVue.use(BootstrapVue)

  beforeEach(() => {
    store = { ...state }

    wrapper = mount(FilterContainer, {
      localVue,
      parentComponent: { data: () => ({ store }) }
    })
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('editable mode is toggleable', () => {
    store.filters.canEdit = false
    expect(wrapper.find('.remove-button').exists()).toBe(false)
    expect(wrapper.find('.add-button').exists()).toBe(false)
    store.filters.canEdit = true
    expect(wrapper.find('.remove-button').exists()).toBe(true)
    expect(wrapper.find('.add-button').exists()).toBe(true)
  })

  it('filters are removable when filters are editable', () => {
    store.filters.canEdit = true
    const before = wrapper.findAll('.filter').length
    wrapper.find('.remove-button').trigger('click')
    const after = wrapper.findAll('.filter').length
    expect(after).toBeLessThan(before)
  })

  it('filter is addable when filters are editable', (done) => {
    store.filters.canEdit = true
    wrapper.find('.add-button').trigger('click')
    const before = wrapper.findAll('.filter').length
    wrapper.vm.$nextTick(() => {
      wrapper.find('#modal-add-filter .modal-footer button.btn-primary').trigger('click')
      const after = wrapper.findAll('.filter').length
      expect(before).toBeLessThan(after)
      done()
    })
  })
})
