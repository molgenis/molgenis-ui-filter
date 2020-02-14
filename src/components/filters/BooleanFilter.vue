<template>
  <label class="slider-checkbox-container">
    <span
      v-if="falseLabel"
      class="label-text"
    >{{ falseLabel }}</span>
    <div class="slider-checkbox">
      <div class="inner-slider">
        <input
          v-model="selection"
          type="checkbox"
        >
        <div class="slider-knob bg-light" />
        <div
          class="slider-background"
          :class="isSet ? 'bg-primary' : 'bg-secondary'"
        />
      </div>
    </div>
    <span
      v-if="trueLabel"
      class="label-text"
    >{{ trueLabel }}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: [Function],
      required: true
    }
  },
  data () {
    return {
      isSet: Boolean,
      trueLabel: String,
      falseLabel: String
    }
  },
  computed: {
    selection: {
      get () {
        return this.isSet
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
        this.isSet = value
      }
    }
  },
  created () {
    this.options().then(response => {
      this.trueLabel = response.trueLabel
      this.falseLabel = response.falseLabel
    })
  }
}
</script>

<style scoped>
.slider-checkbox-container {
  font-size: 62.5%; /* 1em = 10px */
  display: flex;
  flex-flow: row;
  align-items: center;
}
.slider-checkbox {
  position: relative;
  overflow: hidden;
}
.slider-knob {
  width: 1.6em;
  height: 1.6em;
  display: inline-block;
  border-radius: 1em;
  margin: 0 0 0 1px;
  z-index: 10;
  transition: all 0.2s ease;
}
.slider-background {
  position: absolute;
  width: 3.5em;
  height: 100%;
  border-radius: 0.8em;
  transition: all 0.2s ease;
}

input {
  display: none;
}
input[type='checkbox']:checked + .slider-knob {
  /* this is why you want to have 1 rem === 10px; now working with ems*/
  transform: translateX(1.7em);
  transition: all 0.2s ease;
}

.inner-slider {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 0.8em;
  margin: 0;
  background-color: lightgrey;
  height: 1.8em;
  width: 3.5em;
}

.label-text {
  font-size: 1.6em;
}

.label-text:first-child {
  margin-right: 1.6em;
}
.label-text:last-child {
  margin-left: 1.6em;
}
</style>
