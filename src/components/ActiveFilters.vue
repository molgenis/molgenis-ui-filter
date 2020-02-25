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
  computed: {
    activeValues: function () {
      const activeValues = []

      for (const filter of this.filters.filter((f) => f.selected)) {
        const current = filter.active
        // Clean op the values by removing undefined entry's
        if (current === undefined) return

        if (Array.isArray(current)) {
          if (filter.type === 'multi-filter') {
            for (const filter of current) {
              activeValues.push({ key, value: filter.value, label: filter.text })
            }
          }

          if (filter.type === 'checkbox-filter') {
            // API calls shouldn't be made this often; please use
            // current value.
            // const option = await filter.options()

            current.forEach(subKey => {
              const findTextFromValue = option.filter(filter => filter.value === subKey)[0]
              activeValues.push({ key, subKey, value: findTextFromValue.text, label: filter.label })
            })
          }
          // Range Filter
          if (filter.type === 'range-filter') {
            activeValues.push({ key, value: `${current[0]} to ${current[1]}`, label: filter.label })
          }
        } else {
          // Single item
          activeValues.push({ key, value: current, label: filter.label })
        }
      }

      return activeValues
    }
  },
  methods: {
    removeFilter ({ key, subKey }) {
      if (subKey === undefined) {
        Vue.delete(this.filters.selected, key)
      } else {
        Vue.set(this.filters.selected[key], selections[key].filter(key => key !== subKey))
      }
    }
  },
  store: ['filters']
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
