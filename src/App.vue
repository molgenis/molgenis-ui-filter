<template>
  <div
    id="app"
    class="container"
  >
    <div class="row">
      <div class="col col-md-3">
        <filter-container :can-edit="true" />
      </div>
      <div class="col col-md-8">
        <active-filters />
        <pre class="store-debug"><strong>filters:</strong>{{ visibleFilters }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as components from './components/filters'
import { FilterContainer, ActiveFilters } from './components/'

export default Vue.extend({
  name: 'App',
  components: { FilterContainer, ActiveFilters, ...components },
  computed: {
    visibleFilters () {
      return this.filters.filter(filter => filter.visible)
    }
  },
  store: ['filters']
})
</script>
<style>
.store-debug {
  font-size: 0.6rem !important;
}
</style>
