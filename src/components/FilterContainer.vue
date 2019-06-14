<template>
  <div
    class="filter-container"
    @mouseup="drag=false"
  >
    <draggable
      v-model="filtersToShow"
      :disabled="!canEdit"
      :class="canEdit?(drag?'dragdrop dragging':'dragdrop'):''"
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
          @removeFilter="removeFilter"
        >
          <component
            :is="filter.type"
            :value="value[filter.name]"
            v-bind="filter"
            @input="value => selectionChange(filter.name, value)"
          />
        </filter-card>
      </transition-group>
    </draggable>

    <add-filter-modal
      v-if="listOfInvisibleFilters.length>0"
      v-model="filtersToShow"
      :filters="listOfInvisibleFilters"
      @input="selectionUpdate"
    />
  </div>
</template>

<script>
import AddFilterModal from './AddFilterModal.vue'
import { FilterCard } from '.'
import { StringFilter, CheckboxFilter } from './filters/'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { AddFilterModal, StringFilter, CheckboxFilter, FilterCard, draggable },
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
      drag: false
    }
  },
  computed: {
    listOfVisibleFilters () {
      return this.filtersToShow.map(id => this.filters.find(filter => filter.name === id))
    },
    listOfInvisibleFilters () {
      return this.filters.filter(filter => !this.filtersToShow.includes(filter.name))
    }
  },
  methods: {
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
