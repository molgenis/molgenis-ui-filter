
<template>
  <div>
    <b-input-group class="mb-1">
      <b-form-input
        v-model="sliderValue[0]"
        type="number"
        :min="min"
        :max="max"
        placeholder="from"
        :step="step"
        class="text-center range-from"
        @change="handleChange"
      />
      <b-input-group-append>
        <b-button
          variant="outline-secondary"
          @click.prevent="setSliderValue(0, null)"
        >
          <font-awesome-icon icon="times" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-input-group>
      <b-form-input
        v-model="sliderValue[1]"
        type="number"
        :min="min"
        :max="max"
        placeholder="to"
        :step="step"
        class="text-center range-to"
        @change="handleChange"
      />
      <b-input-group-append>
        <b-button
          variant="outline-secondary"
          @click.prevent="setSliderValue(1, null)"
        >
          <font-awesome-icon icon="times" />
        </b-button>
      </b-input-group-append>
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
  name: 'RangeFilter',
  components: { VueSlider, FontAwesomeIcon },
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
  watch: {
    value (newValue) {
      if (newValue[0] == null && newValue[1] == null) {
        this.sliderValue = [null, null]
      }
    }
  },
  methods: {
    setSliderValue (id, value) {
      this.sliderValue[id] = value
      this.handleChange()
    },
    handleChange () {
      let minVal = null
      let maxVal = null
      if (this.sliderValue[0] != null) {
        minVal = parseFloat(Math.min(Math.max(this.sliderValue[0], this.min), this.max))
      }
      if (this.sliderValue[1] != null) {
        maxVal = parseFloat(Math.min(Math.max(this.sliderValue[1], this.min), this.max))
      }
      this.sliderValue = [minVal, maxVal]

      // clone to break reactive loop
      this.$emit('input', [...this.sliderValue])
    }
  }
})
</script>
