
<template>
  <b-input-group class="flex-nowrap">
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      class="flex-grow-1"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd HH:MM:ss' }"
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

const emptyDateRange = {
  startDate: null,
  endDate: null
}

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
      type: Object,
      default: () => {
        return emptyDateRange
      }
    }
  },
  data: function () {
    return {
      dateRange: {
        startDate: this.value.startDate,
        endDate: this.value.endDate
      }
    }
  },
  computed: {
    formattedDate: function () {
      const date = this.dateRange
      if (!date.startDate || !date.endDate) return 'Select...'
      if (date.startDate.toISOString() === date.endDate.toISOString()) {
        return date.startDate.toLocaleString()
      } else {
        return `${date.startDate.toLocaleString()} - ${date.endDate.toLocaleString()}`
      }
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
  .form-control.reportrange-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
