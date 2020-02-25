<template>
  <div>
    <button
      v-for="filterSelection in filtersSelection"
      :key="`${filterSelection.filter.name}-${filterSelection.id}`"
      type="button"
      class="active-filter btn btn-light m-1 btn-outline-secondary"
      @click="deselectFilter(filterSelection)"
    >
      {{ filterSelection.label }}: {{ filterSelection.name }}
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
    filtersSelection: function () {
      const filtersSelection = []

      for (const filter of this.filters) {
        if (!filter.selection) {
          continue
        } else if (Array.isArray(filter.selection)) {
          if (filter.type === 'multi-filter') {
            for (const [i, optionId] of filter.selection.entries()) {
              const option = filter.options.find((f) => f.id === optionId)
              filtersSelection.push({ id: i, filter, label: filter.label, name: option.name })
            }
          }

          if (filter.type === 'checkbox-filter') {
            for (const [i, selection] of filter.selection.entries()) {
              // const findTextFromValue = option.filter(filter => filter.value === subKey)[0]
              // activeFilters.push({ id: findTextFromValue.text, label: findTextFromValue.text, name: filter.label })
            }
          }
          // Range Filter
          if (filter.type === 'range-filter') {
            filtersSelection.push({ id: filter.id, filter, label: `${current[0]} to ${current[1]}`, name: filter.label })
          }
        } else {
          // Single item
          filtersSelection.push({ id: filter.id, filter, label: filter.label, name: filter.selection })
        }
      }

      return filtersSelection
    }
  },
  methods: {
    deselectFilter (filterSelection) {
      if (Array.isArray(filterSelection.filter.selection)) {
        filterSelection.filter.selection.splice(filterSelection.id, 1)
      } else {
        filterSelection.filter.selection = ''
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
