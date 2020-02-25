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
        v-model="filters"
        :disabled="!doDragDrop"
        :class="{'dragdrop': doDragDrop, 'dragging': drag}"
        @choose="drag=true"
        @end="drag=false"
      >
        <transition-group>
          <filter-card
            v-for="filter in visibleFilters"
            :key="filter.name"
            v-bind="filter"
            :can-remove="canEdit"
            @removeFilter="removeFilter(filter.name)"
          >
            <component
              :is="filter.type"
              :filter="filter"
            />
          </filter-card>
        </transition-group>
      </draggable>

      <add-filter-modal
        v-if="canEdit && invisibleFilters.length > 0"
        v-model="filters.visible"
        :filters="invisibleFilters"
      />
    </b-collapse>
  </div>
</template>

<script>
import AddFilterModal from './AddFilterModal.vue'
import { FilterCard } from '.'
import { StringFilter, CheckboxFilter, NumberFilter, RangeFilter, MultiFilter } from './filters/'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { AddFilterModal, StringFilter, CheckboxFilter, FilterCard, NumberFilter, RangeFilter, MultiFilter, draggable },
  props: {
    canEdit: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
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
    invisibleFilters () {
      return this.filters.filter(filter => !filter.visible)
    },
    visibleFilters () {
      return this.filters.filter(filter => filter.visible)
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
    },
    removeFilter (name) {
      for (const filter of this.filters) {
        if (filter.name === 'name') {
          filter.visible = false
        }
      }
    }
  },
  store: ['filters']
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
