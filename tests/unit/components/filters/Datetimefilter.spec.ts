// @ts-ignore
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { DateTimeFilter } from '@/components/filters/'

const localVue = createLocalVue()
let wrapper: any
let vm: any

describe('DateTimeFilter.vue', () => {
  beforeEach(() => {
    const propsData = {
      name: 'datetime',
      label: 'Datetime',
      collapsed: false,
      max: null,
      min: null,
      opens: 'right',
      type: 'date-time-filter'
    }

    wrapper = mount(DateTimeFilter, { localVue, propsData })
    vm = wrapper.vm
  })

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

  it('creates a date from a given string', () => {
    const value = '1/1/2000'
    // @ts-ignore
    const date = vm.createDateFromValue(value)
    expect(date).toEqual(new Date(Date.parse(value)))
  })

  it('creates a date from a given amount of milliseconds from epoch', () => {
    const epochValue = 1588068623458
    // @ts-ignore
    const date = vm.createDateFromValue(epochValue)
    expect(date).toEqual(new Date(epochValue))
  })

  it('creates a representable date string without the time component, if time is set to false', () => {
    const noTimeProps = {
      name: 'datetime',
      label: 'Datetime',
      collapsed: false,
      time: false,
      type: 'date-time-filter'
    }
    wrapper = mount(DateTimeFilter, { localVue, propsData: noTimeProps })

    const dateToStringify = new Date(1588068623458)
    const comparisonDate = dateToStringify.toLocaleDateString()
    // @ts-ignore
    const dateString = vm.dateString(dateToStringify)
    expect(dateString).toEqual(comparisonDate)
  })

  it('creates a representable date with time string, when time is set to true', () => {
    const dateTimeToStringify = new Date(1588068623458)
    const comparisonDate = dateTimeToStringify.toLocaleString()
    // @ts-ignore
    const dateTimeToString = vm.dateTimeString(dateTimeToStringify)
    expect(dateTimeToString).toEqual(comparisonDate)
  })

  it('returns a single date time string when startDate and EndDate are the same', () => {
    const startDate = new Date(1588068623458)
    const endDate = new Date(1588068623458)
    const comparisonDate = startDate.toLocaleString()
    wrapper.setProps({ value: [startDate, endDate] })
    // @ts-ignore
    const dateTimeString = vm.formattedDate
    expect(dateTimeString).toEqual(comparisonDate)
  })
})
