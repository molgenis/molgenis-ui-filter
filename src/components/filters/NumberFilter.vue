<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model.number="filter.selection"
        type="number"
        :min="filter.min"
        :max="filter.max"
        :step="filter.step"
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
  name: 'NumberFilter',
  components: { VueSlider },
  // eslint-disable-next-line vue/require-prop-types
  props: ['filter']
})
</script>
