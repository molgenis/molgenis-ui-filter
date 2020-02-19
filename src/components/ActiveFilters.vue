<template>
  <div>
    <button
      v-for="(item, key) in activeValues"
      :key="key"
      type="button"
      class="active-filter btn btn-light m-1 btn-outline-secondary"
      @click="removeFilter(item)"
    >
      {{ item.label }}: {{ item.value }}
      <font-awesome-icon
        icon="times"
        class="ml-1"
      />
    </button>
  </div>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
  name: 'ActiveFilters',
  components: { FontAwesomeIcon },
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      activeValues: []
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.buildActiveValues(newValue)
      },
      immediate: true
    }
  },
  methods: {
    async buildActiveValues (newValue) {
      const activeValues = []
      for (const [key, current] of Object.entries(newValue)) {
        const filter = this.selectFilter(key)

        // Clean up the values by removing undefined entries.
        if (current === undefined) continue

        if (filter.type === 'date-time-filter') {
          let value
          if (current instanceof Date) {
            value = current.toLocaleDateString()
          } else {
            value = `${current.startDate.toLocaleDateString()} - ${current.endDate.toLocaleDateString()}`
          }

          activeValues.push({ key, value, label: filter.label })
          continue
        }

        // Single item.
        if (!Array.isArray(current)) {
          activeValues.push({ key, value: current, label: filter.label })
        } else {
          if (filter.type === 'checkbox-filter') {
            const option = await filter.options()
            for (const subKey of current) {
              const findTextFromValue = option.filter(filter => filter.value === subKey)[0]
              activeValues.push({ key, subKey, value: findTextFromValue.text, label: filter.label })
            }
          }
          if (filter.type === 'range-filter') {
            activeValues.push({ key, value: `${current[0]} to ${current[1]}`, label: filter.label })
          }
        }
      }

      if (this.value === newValue) {
        this.activeValues = activeValues
      }
    },
    selectFilter (key) {
      return this.filters.filter(filter => filter.name === key)[0]
    },
    removeFilter ({ key, subKey }) {
      if (subKey === undefined) {
        let selections = { ...this.value }
        delete selections[key]
        this.$emit('input', selections)
      } else {
        let selections = { ...this.value }
        selections[key] = selections[key].filter(key => key !== subKey)
        this.$emit('input', selections)
      }
    }
  }
})
</script>

<style scoped>
  button svg path {
    transition: fill 0.3s;
  }
  button:hover svg path {
    fill: var(--danger);
  }
</style>
