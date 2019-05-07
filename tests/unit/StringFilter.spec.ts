import { mount } from '@vue/test-utils'
import { StringFilter } from '@/components'

describe('StringFilter.vue', () => {
  const wrapper = mount(StringFilter, {
    propsData: {
      label: 'label',
      placeholder: 'placeholder',
      value: 'value'
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchInlineSnapshot(`
<div
  class="input-group"
  label="label"
  role="group"
>
  <!---->
  <!---->
  <input
    class="form-control"
    id="__BVID__4"
    placeholder="placeholder"
    type="text"
  />
   
  <div
    class="input-group-append"
  >
    <button
      class="btn btn-outline-secondary"
      type="button"
    >
      x
    </button>
  </div>
  <!---->
  <!---->
</div>
`)
  })

  it('Sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('value')
  })

  it('Emits undefined when button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([undefined])
  })
})
