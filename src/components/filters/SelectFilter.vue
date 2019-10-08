<template>
  <b-input-group>
    <b-form-select v-model="selection" :options="options">
      <option :value="null">{{placeholder}}</option>
    </b-form-select>
  </b-input-group>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'SelectFilter',
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'Please select an option'
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: () => null
    }
  },
  computed: {
    selection: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value === null ? undefined : value)
      }
    }
  }
})
</script>
