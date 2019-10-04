
<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="sliderValue[0]"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        class="text-center range-from"
        @change="handleFromChange"
      />
      <b-form-input
        v-model="sliderValue[1]"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        class="text-center range-to"
        @change="handleToChange"
      />
    </b-input-group>
    <vue-slider
      v-model="sliderValue"
      :min="min"
      :max="max"
      :interval="step"
      class="mt-2"
      @change="handleSliderChange"
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
  props: {
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: () => Number.MIN_SAFE_INTEGER
    },
    max: {
      type: Number,
      default: () => Number.MAX_SAFE_INTEGER
    },
    step: {
      type: Number,
      default: () => 1
    },
    value: {
      type: Array,
      default: () => [0, 0]
    }
  },
  data: function () {
    return {
      sliderValue: [this.min, this.max]
    }
  },
  methods: {
    handleSliderChange () {
      this.sliderValue = [parseFloat(this.sliderValue[0]), parseFloat(this.sliderValue[1])]
      // clone to break reactive loop
      this.$emit('input', [...this.sliderValue])
    },
    handleFromChange () {
      this.sliderValue = [parseFloat(this.sliderValue[0]), parseFloat(this.sliderValue[1])]
      // clone to break reactive loop
      this.$emit('input', [...this.sliderValue])
    },
    handleToChange () {
      this.sliderValue = [parseFloat(this.sliderValue[0]), parseFloat(this.sliderValue[1])]
      // clone to break reactive loop
      this.$emit('input', [...this.sliderValue])
    }
  }
})
</script>
