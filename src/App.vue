<template>
  <div value="app" class="container">
    <div class="row">
      <div class="col col-md-3">
        <FilterContainer :filters="filters" v-model="selections" />
      </div>
      <div class="col col-md-8">
        <pre>{{selections}}</pre>
      </div>
    </div>
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
        search: 'value',
        country: ['nl']
      },
      filters: [ {
        name: 'search',
        label: 'Search',
        description: 'search by name',
        initiallyCollapsed: true,
        placeholder: 'test',
        type: 'string'
      }, {
        name: 'smoking',
        label: 'Smoking',
        initiallyCollapsed: false,
        options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }, { value: null, text: 'N/A' }],
        type: 'checkbox'
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
        options: [{ value: 'value', text: 'label' }, { value: 'nl', text: 'Nederland' }, { value: 'de', text: 'Duitseland' }],
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
