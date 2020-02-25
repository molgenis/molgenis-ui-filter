<template>
  <div>
    <b-button
      v-b-modal.modal-add-filter
      variant="outline-secondary"
      class="w-100 mt-2 add-button"
    >
      Add a filter
      <font-awesome-icon
        class="ml-1"
        icon="plus"
      />
    </b-button>

    <b-modal
      id="modal-add-filter"
      title="Add filter"
      @ok="addFilter"
      @show="resetModal"
    >
      <b-form-select
        v-model="selected"
        name="filter"
        :options="inactiveFilters"
        value-field="id"
        text-field="name"
      />
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPlus)

export default Vue.extend({
  name: 'AddFilterModal',
  components: { FontAwesomeIcon },
  store: ['filters'],
  data () {
    return {
      selected: null
    }
  },
  computed: {
    options () {
      return this.filters.map((filter) => ({
        id: filter.name,
        name: filter.label
      }))
    },
    inactiveFilters () {
      return this.filters.filter(filter => !filter.active).map((f) => ({
        id: f.name,
        name: f.label
      }))
    }
  },
  methods: {
    resetModal () {
      this.selected = this.filters[0].name
    },
    addFilter () {
      console.log('ADD FILTER', this.selected)
      const filter = this.filters.find((f) => f.label === this.selected)
      filter.active = true
    }
  }
})
</script>
