
<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="sliderValue[0]"
        type="number"
        :min="min"
        :max="max"
        placeholder="min"
        :step="step"
        class="text-center range-from"
        @change="handleChange"
      />
      <b-form-input
        v-model="sliderValue[1]"
        type="number"
        :min="min"
        :max="max"
        placeholder="max"
        :step="step"
        class="text-center range-to"
        @change="handleChange"
      />
    </b-input-group>
    <vue-slider
      v-if="useSlider"
      v-model="sliderValue"
      :min="min"
      :max="max"
      :interval="step"
      class="mt-2"
      @change="handleChange"
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
      default: () => [null, null]
    },
    useSlider: {
      type: Boolean,
      default: () => false
    }
  },
  data: function () {
    return {
      sliderValue: [null, null]
    }
  },
  methods: {
    handleChange () {
      if (this.sliderValue[0] === this.min && this.sliderValue[1] === this.max) {
        this.$emit('input', undefined)
      } else {
        this.sliderValue = [parseFloat(Math.max(this.min, this.sliderValue[0])), parseFloat(Math.min(this.max, this.sliderValue[1]))]
        // clone to break reactive loop
        this.$emit('input', [...this.sliderValue])
      }
    }
  }
})
</script>
