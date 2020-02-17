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
        <pre class="store-debug"><strong>filters:</strong>{{ activeFilters }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { FilterContainer, ActiveFilters } from './components/'

export default Vue.extend({
  name: 'App',
  components: { FilterContainer, ActiveFilters },
  computed: {
    activeFilters: function () {
      return this.filters.filter(filter => filter.active).map((f) => {
        return { label: f.label, selection: f.selection }
      })
    }
  },
  store: {
    'filters': 'filters.available'
  }
})
</script>
<style>
.store-debug {
  font-size: 0.6rem !important;
}
</style>
