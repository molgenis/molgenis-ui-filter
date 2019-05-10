<template>
  <div
    id="app"
    class="container"
  >
    <div class="row">
      <div class="col col-md-3">
        <FilterContainer
          v-model="selections"
          :filters="filters"
        />
      </div>
      <div class="col col-md-8">
        <pre>{{ selections }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as components from './components'

export default Vue.extend({
  name: 'App',
  components,
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
        type: 'string-filter'
      }, {
        name: 'smoking',
        label: 'Smoking',
        initiallyCollapsed: false,
        options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }, { value: null, text: 'N/A' }],
        type: 'checkbox-filter'
      }, {
        name: 'materials',
        label: 'Materials',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox-filter'
      }, {
        name: 'country',
        label: 'Countries',
        initiallyCollapsed: false,
        options: [{ value: 'value', text: 'label' }, { value: 'nl', text: 'Nederland' }, { value: 'de', text: 'Duitseland' }],
        type: 'checkbox-filter'
      }, {
        name: 'biobank_quality',
        label: 'Biobank quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox-filter'
      }, {
        name: 'collection_quality',
        label: 'Collection quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox-filter'
      }, {
        name: 'type',
        label: 'Collection Types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox-filter'
      }, {
        name: 'dataType',
        label: 'Data types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: 'checkbox-filter'
      }]
    }
  }
})
</script>

<style>
</style>
