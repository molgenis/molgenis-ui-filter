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
        string: '',
        name: ['value2']
      },
      filters: [ {
        name: 'string',
        label: 'String',
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
