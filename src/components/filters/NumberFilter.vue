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
      default: () => Number.MIN_VALUE
    },
    max: {
      type: Number,
      default: () => Number.MAX_VALUE
    },
    step: {
      type: Number,
      default: () => 'any'
    },
    value: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
})
</script>
