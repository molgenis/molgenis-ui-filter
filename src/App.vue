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
        <active-filters
          v-model="selections"
          :filters="filters"
        />
        <br><br>
        <pre><strong>selections:</strong>{{ selections }}</pre>
        <pre><strong>visibility:</strong>{{ filtersShown }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as components from './components/filters'
import { FilterContainer, ActiveFilters } from './components/'

import mockData from '../tests/mockdata'

export default Vue.extend({
  name: 'App',
  'components': { FilterContainer, ActiveFilters },
  data () {
    return {
      selections: {
        search: 'test'
      },
      filtersShown: ['datetime', 'disease'],
      filters: [
        {
          name: 'name',
          label: 'Label',
          description: 'description',
          collapsed: false
        },
        {
          name: 'datetime',
          label: 'Datetime',
          collapsed: false,
          max: null,
          min: null,
          opens: 'right',
          range: true,
          time: true,
          type: 'date-time-filter'
        },
        {
          name: 'age',
          label: 'Age',
          collapsed: false,
          min: -10,
          max: 10,
          step: 0.01,
          type: 'range-filter'
        },
        {
          name: 'disease', // attribute name
          label: 'Filter with multiple options',
          collapsed: false,
          options: mockData.multifilterOptions,
          type: 'multi-filter'
        },
        {
          name: 'search',
          label: 'Search',
          description: 'search by string',
          placeholder: 'placeholder',
          type: 'string-filter',
          collapsable: false
        },
        {
          name: 'color',
          label: 'Color',
          collapsed: false,
          bulkOperation: true,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxOptions)
              })
          },
          type: 'checkbox-filter'
        },
        {
          name: 'number',
          label: 'Number',
          collapsed: false,
          type: 'number-filter'
        },
        {
          name: 'name1',
          label: 'Name',
          description: 'Name of object',
          type: 'string-filter',
          collapsed: false
        },
        {
          name: 'string',
          label: 'String',
          description: 'search by string',
          placeholder: 'placeholder',
          type: 'string-filter',
          collapsable: true,
          collapsed: false
        },
        {
          name: 'checkbox',
          label: 'Checkbox',
          collapsed: false,
          bulkOperation: true,
          maxVisibleOptions: 1,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxOptions)
              })
          },
          type: 'checkbox-filter'
        },
        {
          name: 'checkbox-options',
          label: 'Checkbox lots of options',
          collapsed: false,
          bulkOperation: true,
          maxVisibleOptions: 1,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxLotsOptions)
              })
          },
          type: 'checkbox-filter'
        },
        {
          name: 'long-name',
          label: 'Way too long name to really fit in the user interface',
          collapsed: true,
          bulkOperation: true,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.boolCheckboxes)
              })
          },
          type: 'checkbox-filter'
        }
      ]
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
