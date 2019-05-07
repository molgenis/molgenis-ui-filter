<template>
  <div class="filter-container">
    <filter-card v-for="filter in filters"
                 :key="filter.name"
                 v-bind="filter">
      <string-filter
        :name="name"
        :value="value[filter.name]"
        @input="(value) => selectionChange(filter.name, value)"
        v-if="filter.type === 'string'"
        v-bind="filter"
      ></string-filter>
      <checkbox-filter
        :value="value[filter.name]"
        @input="(value) => selectionChange(filter.name, value)"
        v-if="filter.type === 'checkbox'"
        v-bind="filter">
      </checkbox-filter>
    </filter-card>
  </div>
</template>

<script>
import { FilterCard, StringFilter, CheckboxFilter } from '.'

export default {
  name: 'FilterContainer',
  props: {
    filters: Array,
    value: Object
  },
  methods: {
    selectionChange (name, value) {
      this.$emit('input', { ...this.value, [name]: value })
    }
  },
  components: { StringFilter, CheckboxFilter, FilterCard }
}
</script>
