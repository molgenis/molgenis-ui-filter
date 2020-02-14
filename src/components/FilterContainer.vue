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
        v-model="filtersToShow"
        :disabled="!doDragDrop"
        :class="{'dragdrop': doDragDrop, 'dragging': drag}"
        @choose="drag=true"
        @end="drag=false"
        @input="selectionUpdate"
      >
        <transition-group>
          <filter-card
            v-for="filter in listOfVisibleFilters"
            :key="filter.name"
            v-bind="filter"
            :can-remove="canEdit"
            @removeFilter="removeFilter(filter.name)"
          >
            <component
              :is="filter.type"
              :name="filter.name"
              :value="value[filter.name]"
              v-bind="filter"
              @input="value => selectionChange(filter.name, value)"
            />
          </filter-card>
        </transition-group>
      </draggable>
      <add-filter-modal
        v-if="canEdit && listOfInvisibleFilters.length > 0"
        v-model="filtersToShow"
        :filters="listOfInvisibleFilters"
        @input="selectionUpdate"
      />
    </b-collapse>
  </div>
</template>

<script>
import AddFilterModal from './AddFilterModal.vue'
import { FilterCard } from '.'
import { StringFilter, CheckboxFilter, NumberFilter, RangeFilter, BooleanFilter } from './filters/'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { AddFilterModal, StringFilter, CheckboxFilter, FilterCard, NumberFilter, RangeFilter, BooleanFilter, draggable },
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    },
    filtersShown: {
      type: Array,
      required: false,
      default: () => []
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      filtersToShow: this.filtersShown,
      filterToAdd: null,
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
    listOfVisibleFilters () {
      return this.filters.filter(filter => this.filtersToShow.includes(filter.name))
    },
    listOfInvisibleFilters () {
      return this.filters.filter(filter => !this.filtersToShow.includes(filter.name))
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
      this.filtersToShow = this.filtersToShow.filter(filter => name !== filter)
      this.$emit('update', this.filtersToShow)

      let selections = { ...this.value }
      delete selections[name]
      this.$emit('input', selections)
    },
    selectionChange (name, value) {
      this.$emit('input', { ...this.value, [name]: value })
    },
    selectionUpdate () {
      this.$emit('update', this.filtersToShow)
    }
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
