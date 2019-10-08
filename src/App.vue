<template>
  <div
    id="app"
    class="container"
  >
    <div class="row">
      <div class="col col-md-3">
        <filter-container
          v-model="selections"
          :filters="filters"
          :filters-shown="filtersShown"
          :can-edit="true"
          @update="updateState"
        />
      </div>
      <div class="col col-md-8">
        <pre><strong>selections:</strong>
{{ selections }}</pre>
        <pre><strong>visibility:</strong>
        {{ filtersShown }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as components from './components/filters'
import { FilterContainer } from './components/'

export default Vue.extend({
  name: 'App',
  'components': { FilterContainer, ...components },
  data () {
    return {
      selections: {
        search: 'test'
      },
      filtersShown: ['search', 'color', 'select', 'price'],
      filters: [ {
        name: 'search',
        label: 'Search',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'color',
        label: 'Color',
        collapsed: false,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'select',
        label: 'Select',
        collapsed: false,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'select-filter'
      }, {
        name: 'price',
        label: 'Price',
        type: 'string-filter'
      }, {
        name: 'string',
        label: 'String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: true,
        collapsed: false
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'long-name',
        label: 'Way too long name to really fit in the user interface',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }],
        type: 'checkbox-filter'
      }]
    }
  },
  methods: {
    updateState (newState) {
      this.filtersShown = newState
    }
  }
})
</script>

<style>
</style>
