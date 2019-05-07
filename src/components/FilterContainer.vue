<template>
  <div class="filter-container">

    <filter-card v-for="filter in filters"
                 :key="filter.name"
                 v-bind="filter">
      <string-filter v-model="filter.value" v-if="filter.type === 'string'" v-bind="filter"></string-filter>
      <checkbox-filter v-model="filter.selected" v-if="filter.type === 'checkbox'" v-bind="filter"></checkbox-filter>
    </filter-card>

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
  data () {
    return {
      filters: [ {
        name: 'search',
        label: 'Search',
        description: 'search by name',
        initiallyCollapsed: true,
        placeholder: 'test',
        options: [],
        selected: [],
        value: '',
        maxVisibleOptions: 4,
        type: 'string'
      }, {
        name: 'materials',
        label: 'Materials',
        initiallyCollapsed: false,
        options: [],
        selected: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'country',
        label: 'Countries',
        initiallyCollapsed: false,
        options: [{ id: 'id', label: 'label' }, { id: 'nl', label: 'Nederland' }, { id: 'de', label: 'Duitseland' }],
        selected: ['nl'],
        type: 'checkbox'
      }, {
        name: 'biobank_quality',
        label: 'Biobank quality marks',
        initiallyCollapsed: false,
        options: [],
        selected: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'collection_quality',
        label: 'Collection quality marks',
        initiallyCollapsed: false,
        options: [],
        selected: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'type',
        label: 'Collection Types',
        initiallyCollapsed: false,
        options: [],
        selected: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'dataType',
        label: 'Data types',
        initiallyCollapsed: false,
        options: [],
        selected: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }]
    }
  },
  computed: {

  },
  methods: {
    filterChange (name, filters) {

    }
  },
  components: { StringFilter, CheckboxFilter, FilterCard }
}
</script>
