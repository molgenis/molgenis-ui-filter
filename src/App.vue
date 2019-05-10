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
import { FilterContainer, StringFilter, CheckboxFilter } from './components'

export default Vue.extend({
  name: 'App',
  components: {
    FilterContainer
  },
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
        type: StringFilter
      }, {
        name: 'smoking',
        label: 'Smoking',
        initiallyCollapsed: false,
        options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }, { value: null, text: 'N/A' }],
        type: CheckboxFilter
      }, {
        name: 'materials',
        label: 'Materials',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: CheckboxFilter
      }, {
        name: 'country',
        label: 'Countries',
        initiallyCollapsed: false,
        options: [{ value: 'value', text: 'label' }, { value: 'nl', text: 'Nederland' }, { value: 'de', text: 'Duitseland' }],
        type: CheckboxFilter
      }, {
        name: 'biobank_quality',
        label: 'Biobank quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: CheckboxFilter
      }, {
        name: 'collection_quality',
        label: 'Collection quality marks',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: CheckboxFilter
      }, {
        name: 'type',
        label: 'Collection Types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: CheckboxFilter
      }, {
        name: 'dataType',
        label: 'Data types',
        initiallyCollapsed: false,
        options: [],
        maxVisibleOptions: 4,
        type: CheckboxFilter
      }]
    }
  }
})
</script>

<style>
</style>
