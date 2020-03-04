
<template>
  <b-input-group class="flex-nowrap">
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      class="flex-grow-1"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd HH:MM:ss' }"
      :single-date-picker="singleDatePicker"
      :time-picker="time"
      :time-picker24hour="timePicker24Hour"
      :show-week-numbers="showWeekNumbers"
      :show-dropdowns="showDropdowns"
      :auto-apply="false"
      :ranges="show_ranges ? undefined : false"
      :linked-calendars="linkedCalendars"
      :always-show-calendars="alwaysShowCalendars"
      @update="updateValues"
    >
      <div
        slot="input"
        slot-scope="picker"
      >
        {{ picker.startDate | date }}
      </div>
    </date-range-picker>
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        @click="clearValue"
      >
        <font-awesome-icon icon="times" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import Vue from 'vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

const emptyDateRange = {
  startDate: null,
  endDate: null
}

export default Vue.extend({
  name: 'DateTimeFilter',
  components: { DateRangePicker, FontAwesomeIcon },
  filters: {
    date: function (date) {
      if (date) {
        return date.toLocaleString()
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    time: {
      type: Boolean,
      default: () => true
    },
    range: {
      type: Boolean,
      default: () => true
    },
    value: {
      type: Object,
      default: () => {
        return emptyDateRange
      }
    }
  },
  data: function () {
    return {
      opens: 'right',
      dateRange: {
        startDate: this.value.startDate,
        endDate: this.value.endDate
      },
      show_ranges: false,
      singleDatePicker: false,
      timePicker24Hour: true,
      showDropdowns: true,
      showWeekNumbers: false,
      linkedCalendars: false,
      alwaysShowCalendars: true
    }
  },
  watch: {
    value (newValue) {
      this.dateRange = newValue
    }
  },
  methods: {
    clearValue: function () {
      this.dateRange = emptyDateRange
      this.$emit('input', undefined)
    },
    updateValues: function () {
      this.$emit('input', this.dateRange)
    }
  }
})
</script>
<style lang="css">
  .form-control.reportrange-text div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
