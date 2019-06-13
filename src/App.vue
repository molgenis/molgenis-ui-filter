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
import * as components from './components/filters'
import { FilterContainer } from './components/'

export default Vue.extend({
  name: 'App',
  'components': { FilterContainer, ...components },
  data () {
    return {
      selections: {
        string: 'test'
      },
      filtersShown: ['string', 'checkbox'],
      filters: [ {
        name: 'string',
        label: 'String String String String String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'string2',
        label: 'String2',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }]
    }
  }
})
</script>

<style>
</style>
