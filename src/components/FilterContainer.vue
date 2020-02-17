<template>
  <div
    class="filter-container"
    @mouseup="drag=false"
  >
    <b-collapse
      id="mobile-button-toggle"
      :visible="doCollapse"
    >
      <button
        class="btn w-100 my-2 btn-outline-secondary"
        @click="mobileToggle=!mobileToggle"
      >
        {{ mobileToggle?'Hide filters':'Show filters' }}
      </button>
    </b-collapse>

    <b-collapse
      id="mobile-toggle"
      :visible="!doCollapse || mobileToggle"
    >
      <draggable
        v-model="activeFilters"
        :disabled="!doDragDrop"
        :class="{'dragdrop': doDragDrop, 'dragging': drag}"
        @choose="drag=true"
        @end="drag=false"
      >
        <transition-group>
          <filter-card
            v-for="filter in activeFilters"
            :key="filter.id"
            :filter="filter"
            :can-remove="canEdit"
            class="filter"
            @removeFilter="filter.active = false"
          >
            <component
              :is="filter.type"
              :filter="filter"
            />
          </filter-card>
        </transition-group>
      </draggable>

      <add-filter-modal
        v-if="canEdit && inactiveFilters.length > 0"
        :filters="inactiveFilters"
      />
    </b-collapse>
  </div>
</template>

<script>
import AddFilterModal from './AddFilterModal.vue'
import { FilterCard } from '.'
import * as components from '../components/filters'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { AddFilterModal, FilterCard, draggable, ...components },
  data () {
    return {
      drag: false,
      width: 0,
      mobileToggle: false
    }
  },
  computed: {
    doCollapse () {
      // Bootstrap's mobile collapse width
      return this.width <= 576
    },
    doDragDrop () {
      return this.canEdit && !this.doCollapse
    },
    inactiveFilters () {
      return this.filters.filter(filter => !filter.active)
    },
    /**
     * A setter is required, because the <draggable> component
     * uses this computed property to update the filter order.
     */
    activeFilters: {
      get () {
        return this.filters.filter(filter => filter.active)
      },
      set (value) {
        // Reordering the active filter order to the start
        // of the array. Inactive filters are stacked after.
        this.filters = value.concat(this.inactiveFilters)
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.width = window.innerWidth
    }
  },
  store: {
    canEdit: 'filters.canEdit',
    filters: 'filters.available'
  }
}
</script>

<style scoped>
  .dragdrop{
    cursor: grab;
  }
  .dragdrop.dragging{
    cursor: grabbing;
  }
</style>
