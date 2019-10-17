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
      isOpen: this.collapsable ? !this.collapsed : true
    }
  },
  computed: {
    activeValues () {
      let values = []
      Object.entries(this.value).forEach(([key, current]) => {
        const filter = this.selectFilter(key)

        // Clean op the values by removing undefined entry's
        if (current === undefined) return

        // Unpack array
        if (Array.isArray(current)) {
          // Checkbox
          if (filter.type === 'checkbox-filter') {
            current.forEach(subKey => {
              const option = filter.options.filter(item => item.value === subKey)[0]
              values.push({ key, subKey, value: option.text, label: filter.label })
            })
          }

          // Range Filter
          if (filter.type === 'range-filter') {
            values.push({ key, value: `${current[0]} to ${current[1]}`, label: filter.label })
          }
        } else {
          // Single item
          values.push({ key, value: current, label: filter.label })
        }
      })
      return values
    }
  },
  methods: {
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
