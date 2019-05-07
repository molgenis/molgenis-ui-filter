<template>
  <b-input-group>
    <b-form-input
      :name="name"
      v-model="model"
      :placeholder="placeholder"
      trim
    >
    </b-form-input>
    <b-input-group-append>
      <b-button variant="outline-secondary" @click.prevent="model=''">x</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'StringFilter',
  props: {
    name: String,
    placeholder: String,
    value: String
  },
  computed: {
    model: {
      get () {
        return this.value || ''
      },
      set (value) {
        this.$emit('input', value === '' ? undefined : value)
      }
    }
  }
}
</script>
