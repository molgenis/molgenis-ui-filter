// @ts-ignore
import { createLocalVue, mount } from '@vue/test-utils'
import { DateTimeFilter } from '@/components/filters/'

const localVue = createLocalVue()

describe('Datetimefilter.vue', () => {
  const propsData = {
    name: 'datetime',
    label: 'Datetime',
    collapsed: false,
    max: null,
    min: null,
    opens: 'right',
    range: true,
    time: true,
    type: 'date-time-filter'
  }

  const wrapper = mount(DateTimeFilter, { localVue, propsData })
  const vm:any = wrapper.vm

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets a date range', async () => {
    wrapper.find('.vue-daterange-picker div').trigger('click')
    wrapper.findAll('.yearselect').setValue('2020')

    wrapper.find('.drp-calendar.left .monthselect').setValue('3')
    wrapper.find('.drp-calendar.left .monthselect').setValue('3')

    wrapper.find('.vue-daterange-picker div table tr:nth-child(2) td:nth-child(7)').trigger('click')
    wrapper.find('.vue-daterange-picker div table tr:nth-child(4) td:nth-child(1)').trigger('click')
    wrapper.find('.applyBtn').trigger('click')
    await localVue.nextTick()

    expect(vm.dateRange.startDate.toISOString()).toBe('2020-03-01T12:00:00.000Z')
    expect(vm.dateRange.endDate.toISOString()).toBe('2020-03-09T12:00:00.000Z')
    expect(wrapper.emitted().input).toBeTruthy()
    wrapper.find('.t-btn-clear').trigger('click')
    expect(vm.dateRange.startDate).toBe(null)
    expect(vm.dateRange.endDate).toBe(null)
  })
})
