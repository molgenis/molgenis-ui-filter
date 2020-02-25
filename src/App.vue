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

import data from '../tests/mockdata'

// API setup for testing filters.
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 15000
})

export default Vue.extend({
  name: 'App',
  'components': { FilterContainer, ActiveFilters, ...components },
  data () {
    return {
      selections: {
        search: 'test'
      },
      filtersShown: ['multi-filter', 'search', 'color', 'name', 'age', 'number', 'checkbox-options'],
      filters: [
        {
          name: 'multi-filter',
          label: 'Filter with multiple options',
          collapsed: false,
          entity: 'root_hospital_diagnosis',
          metaQuery: async (entity) => api.get(`metadata/${entity}`),
          dataQuery: async (query, entity, metadata) => {
            const nameAttr = metadata.data.data.attributes.items.filter((i) => i.data.labelAttribute).map((i) => i.data.name)[0]
            const data = await api.get(`data/${entity}?q=${nameAttr}=like=${query}`)
            return data.data.items.map((i) => {
              return { value: i.data.id, text: i.data[nameAttr] }
            })
          },
          options: (checked, entity) => api.get(`data/${entity}?q=id=in=(${checked.join(',')})`),
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
                resolve(data.checkboxOptions)
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
          name: 'age',
          label: 'Age',
          collapsed: false,
          min: -10,
          max: 10,
          step: 0.01,
          type: 'range-filter'
        },
        {
          name: 'name',
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
                resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
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
                resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
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
                resolve([{ value: 'no', text: 'No' }, { value: 'yes', text: 'Yes' }])
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
