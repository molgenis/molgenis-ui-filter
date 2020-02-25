
<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model.number="filter.selection[0]"
        type="number"
        :min="filter.min"
        :max="filter.max"
        placeholder="min"
        :step="filter.step"
        class="text-center range-from"
      />
      <b-form-input
        v-model.number="filter.selection[1]"
        type="number"
        :min="filter.min"
        :max="filter.max"
        placeholder="max"
        :step="filter.step"
        class="text-center range-to"
      />
    </b-input-group>
    <vue-slider
      v-if="filter.useSlider"
      v-model="filter.selection"
      :min="filter.min"
      :max="filter.max"
      :interval="filter.step"
      class="mt-2"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default Vue.extend({
  name: 'RangeFilter',
  components: { VueSlider },
  // eslint-disable-next-line vue/require-prop-types
  props: ['filter'],
  watch: {
    // Keep max value in sync with min value.
    'filter.selection.0': function (updatedMinValue) {
      if (updatedMinValue > this.filter.selection[1]) {
        this.filter.selection[1] = this.filter.selection[0]
      }
    },
    // Keep min value in sync with max value.
    'filter.selection.1': function (updatedMaxValue) {
      if (updatedMaxValue < this.filter.selection[0]) {
        this.filter.selection[0] = this.filter.selection[1]
      }
    }
  }
})
</script>
