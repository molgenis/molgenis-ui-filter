
<template>
  <b-input-group class="flex-nowrap">
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      class="flex-grow-1"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: pickerFormat }"
      :single-date-picker="!range"
      :time-picker="time"
      :time-picker24hour="true"
      :show-week-numbers="false"
      :show-dropdowns="true"
      :auto-apply="false"
      :ranges="false"
      :linked-calendars="false"
      :always-show-calendars="true"
      :min-date="min"
      :max-date="max"
      @update="updateValues"
    >
      <template slot="input">
        {{ formattedDate }}
      </template>
    </date-range-picker>
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        class="t-btn-clear"
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

export default Vue.extend({
  name: 'DateTimeFilter',
  components: { DateRangePicker, FontAwesomeIcon },
  props: {
    max: {
      default: () => null,
      type: [String, null]
    },
    min: {
      default: () => null,
      type: [String, null]
    },
    name: {
      type: String,
      required: true
    },
    opens: {
      default: () => 'right',
      type: String
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
      type: Array,
      default: () => [null, null]
    }
  },
  data: function () {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {
    formattedDate: function () {
      const date = this.dateRange
      if (!date.startDate || !date.endDate) return 'Select...'
      if (date.startDate.toISOString() === date.endDate.toISOString()) {
        return this.formatDate(date.startDate)
      } else {
        return `${this.formatDate(date.startDate)} - ${this.formatDate(date.endDate)}`
      }
    },
    pickerFormat () {
      if (this.time) return 'yyyy-mm-dd HH:MM:ss'
      else return 'yyyy-mm-dd'
    }
  },
  watch: {
    value (newValue) {
      this.setDateRange(this.newValue)
    }
  },
  beforeMount () {
    this.setDateRange(this.value)
  },
  methods: {
    clearValue: function () {
      this.dateRange = {
        startDate: null,
        endDate: null
      }

      this.$emit('input', undefined)
    },
    setDateRange (value) {
      this.dateRange.startDate = this.createDateFromValue(this.value[0])
      this.dateRange.endDate = this.createDateFromValue(this.value[1])
    },
    updateValues: function () {
      this.$emit('input', [this.dateRange.startDate, this.dateRange.endDate])
    },
    createDateFromValue (value) {
      if (value) {
        if (!isNaN(value)) return new Date(value)
        return new Date(Date.parse(value))
      }
    },
    formatDate (dateTime) {
      if (this.time) return dateTime.toLocaleString()
      else return dateTime.toLocaleDateString()
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
