<template>
  <div id="app">
    <FilterContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterContainer from './components/FilterContainer.vue'

export default Vue.extend({
  name: 'app',
  components: {
    FilterContainer
  }
})
</script>

<style>
</style>
