<template>
  <div id="app">
    <FilterContainer :filters="filters" :selections="selections" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterContainer from './components/FilterContainer.vue'

export default Vue.extend({
  name: 'app',
  data () {
    return {
      selections: {
        search: '',
        country: ['nl'],
        materials: [],
        biobank_quality: [],
        collection_quality: [],
        type: [],
        dataType: []
      },
      filters: [ {
        name: 'search',
        label: 'Search',
        description: 'search by name',
        initiallyCollapsed: true,
        placeholder: 'test',
        type: 'string'
      }, {
        name: 'materials',
        label: 'Materials',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'country',
        label: 'Countries',
        initiallyCollapsed: false,
        options: [{ id: 'id', label: 'label' }, { id: 'nl', label: 'Nederland' }, { id: 'de', label: 'Duitseland' }],
        type: 'checkbox'
      }, {
        name: 'biobank_quality',
        label: 'Biobank quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'collection_quality',
        label: 'Collection quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'type',
        label: 'Collection Types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }, {
        name: 'dataType',
        label: 'Data types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox'
      }]
    }
  },
  components: {
    FilterContainer
  }
})
</script>

<style>
</style>
