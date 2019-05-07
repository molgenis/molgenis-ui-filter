<template>
  <div class="filter-container">

    <filter-card v-for="filter in filters"
                 :key="filter.name"
                 v-bind="filter">
      <string-filter :value="blah[filter.name]" @input="(value) => blah[filter.name] = value" v-if="filter.type === 'string'" v-bind="filter"></string-filter>
      <checkbox-filter :value="blah[filter.name]" @input="(value) => blah[filter.name] = value" v-if="filter.type === 'checkbox'" v-bind="filter"></checkbox-filter>
    </filter-card>
    {{blah}}
  </div>
</template>

<style scoped>
  .filter-container{
    margin: 20px;
    width: 320px;
  }
</style>

<script>
import { FilterCard, StringFilter, CheckboxFilter } from './filters/'

export default {
  name: 'FilterContainer',

  props: {
    filters: Array,
    selections: Object
  },
  data () {
    return {
      blah: { ...this.selections }
    }
  },
  methods: {
    selectionChange (name, value) {
      console.log(name, value)
      this.blah[name] = value
    }
  },
  components: { StringFilter, CheckboxFilter, FilterCard }
}
</script>
