import { mount } from '@vue/test-utils'
import { BooleanFilter } from '@/components/filters/'

describe('BooleanFilter.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve({ trueLabel: 'Public', falseLabel: 'Private' })
      }
    )
  }

  const propsData = {
    name: 'boolean-filter',
    label: 'Boolean filter',
    options: optionsPromise,
    type: 'boolean-filter'
  }

  const wrapper = mount(BooleanFilter, { propsData })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('changes class to bg-primary when isSet is true', async (done) => {
    wrapper.setData({ selection: true })
    const background = wrapper.find('.slider-background')

    wrapper.vm.$nextTick()

    expect(background.classes()).toContain('bg-primary')
    done()
  })
})
