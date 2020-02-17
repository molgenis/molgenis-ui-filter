<template>
  <b-input-group class="flex-nowrap">
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      :auto-apply="false"
      class="flex-grow-1"
      :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd HH:MM:ss' }"
      :linked-calendars="false"
      :opens="filter.opens"
      :always-show-calendars="true"
      :ranges="false"
      :show-dropdowns="true"
      :show-week-numbers="false"
      :single-date-picker="!filter.range"
      :time-picker="filter.time"
      :time-picker24hour="true"
      :min-date="filter.min"
      :max-date="filter.max"
    >
      <template v-slot:input="picker">
        {{ dateRange.startDate | formatDate(filter.time) }}
      </template>
    </date-range-picker>

    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        @click="clearDateRange"
      >
        <font-awesome-icon icon="times" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import Vue from 'vue'
import DateRangePicker from 'vue2-daterange-picker'
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
    formatDate: (date, time) => {
      if (!date) return 'Select...'
      return time ? date.toLocaleString() : date.toLocaleDateString()
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['filter'],
  data: function () {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  watch: {
    // Convert the selection format of vue2-daterange-picker to
    // be in sync with the preferred filter selection format.
    'dateRange': function toSelection (dateRange) {
      let converted
      if (this.filter.range) {
        converted = [null, null]
        if (dateRange.startDate) {
          converted[0] = this.filter.time ? dateRange.startDate.toLocaleString() : dateRange.startDate.toLocaleDateString()
        }

        if (dateRange.endDate) {
          converted[1] = this.filter.time ? dateRange.endDate.toLocaleString() : dateRange.startDate.toLocaleDateString()
        }
      } else {
        converted = null
        if (dateRange.startDate) {
          converted = this.filter.time ? dateRange.startDate.toLocaleString() : dateRange.startDate.toLocaleDateString()
        }
      }

      this.filter.selection = converted
    }
  },
  methods: {
    clearDateRange: function () {
      this.dateRange = emptyDateRange
      if (this.filter.range) {
        this.filter.selection = [null, null]
      } else {
        this.filter.selection = null
      }
    }
  }
})
</script>
<style lang="css">
  .form-control.reportrange-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
