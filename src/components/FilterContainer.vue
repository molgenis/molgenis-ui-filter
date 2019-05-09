<template>
  <div class="filter-container">
    <filter-card
      v-for="filter in filters"
      :key="filter.name"
      v-bind="filter"
    >
      <string-filter
        v-if="filter.type === 'string'"
        :name="name"
        :value="value[filter.name]"
        v-bind="filter"
        @input="(value) => selectionChange(filter.name, value)"
      />
      <checkbox-filter
        v-if="filter.type === 'checkbox'"
        :value="value[filter.name]"
        v-bind="filter"
        @input="(value) => selectionChange(filter.name, value)"
      />
    </filter-card>
  </div>
</template>

<script>
import { FilterCard, StringFilter, CheckboxFilter } from '.'

export default {
  name: 'FilterContainer',
  components: { StringFilter, CheckboxFilter, FilterCard },
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
  methods: {
    selectionChange (name, value) {
      this.$emit('input', { ...this.value, [name]: value })
    }
  }
}
</script>
