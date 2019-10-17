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
    value () {
      this.buildActiveValues()
    }
  },
  created () {
    this.buildActiveValues()
  },
  methods: {
    buildActiveValues () {
      this.activeValues = []
      Object.entries(this.value).forEach(([key, current]) => {
        const filter = this.selectFilter(key)

        // Clean op the values by removing undefined entry's
        if (current === undefined) return

        // Unpack array
        if (Array.isArray(current)) {
          // Checkbox
          if (filter.type === 'checkbox-filter') {
            // resolve options function/promise and show results later
            filter.options().then(option => {
              current.forEach(subKey => {
                const findTextFromValue = option.filter(filter => filter.value === subKey)[0]
                this.activeValues.push({ key, subKey, value: findTextFromValue.text, label: filter.label })
              })
            })
          }
          // Range Filter
          if (filter.type === 'range-filter') {
            this.activeValues.push({ key, value: `${current[0]} to ${current[1]}`, label: filter.label })
          }
        } else {
          // Single item
          this.activeValues.push({ key, value: current, label: filter.label })
        }
      })
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
