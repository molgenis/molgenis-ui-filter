<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="model"
        type="number"
        :min="min"
        :max="max"
        :step="step"
      />
    </b-input-group>
    <vue-slider
      v-model="model"
      :min="min"
      :max="max"
      :interval="step"
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
      type: Number,
      default: () => null
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', parseFloat(value))
      }
    }
  }
})
</script>
