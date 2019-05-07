<template>
  <div class="input-group">
    <input type="text"
           :name="name"
           class="form-control"
           :placeholder="placeholder"
           :aria-label="label"
           v-model.lazy="model">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary"
              type="button"
              @click.prevent="model=''">x</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StringFilter',
  props: {
    name: String,
    label: String,
    placeholder: String,
    value: String
  },
  computed: {
    model: {
      get () {
        return this.value || ''
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
