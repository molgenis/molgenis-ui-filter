<template>
  <b-input-group>
    <b-form-input
      v-model="model"
      :name="name"
      :placeholder="placeholder"
      trim
    />
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        @click.prevent="model=''"
      >
        x
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'StringFilter',
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => undefined
    },
    value: {
      type: String,
      default: () => ''
    }
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
