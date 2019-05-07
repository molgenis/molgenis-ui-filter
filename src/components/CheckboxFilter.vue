<template>
  <div>
    <b-form-checkbox-group
      stacked
      v-model="selection"
      :options="visibleOptions"
      :name="name"
    ></b-form-checkbox-group>
    <b-link
      class="toggle-slice card-link"
      @click.prevent="toggleSlice"
      v-if="showToggleSlice"
    >{{toggleSliceText}}</b-link>
    <b-link
      class="toggle-select card-link"
      @click.prevent="toggleSelect"
    >{{toggleSelectText}}</b-link>
  </div>
</template>

<style>
  .card-link { font-style: italic; font-size: small; }
</style>

<script>
export default {
  data () {
    return {
      collapsed: this.initiallyCollapsed,
      sliceOptions: this.maxVisibleOptions && this.options && this.maxVisibleOptions < this.options.length
    }
  },
  props: {
    name: String,
    label: String,
    options: Array,
    value: {
      type: Array,
      default: () => []
    },
    initiallyCollapsed: Boolean,
    maxVisibleOptions: Number
  },
  computed: {
    selection: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
    },
    visibleOptions () {
      return this.sliceOptions ? this.options.slice(0, this.maxVisibleOptions) : this.options
    },
    showToggleSlice () {
      return this.maxVisibleOptions && this.maxVisibleOptions < this.options.length
    },
    toggleSelectText () {
      return this.value.length ? 'Deselect all' : 'Select all'
    },
    toggleSliceText () {
      return this.sliceOptions ? `Show ${this.options.length - this.maxVisibleOptions} more` : 'Show less'
    }
  },
  methods: {
    toggleSelect () {
      this.selection = this.selection && this.selection.length ? [] : this.options.map(option => option.value)
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    }
  },
  watch: {
    options () {
      this.sliceOptions = this.showToggleSlice
    },
    maxVisibleOptions () {
      this.sliceOptions = this.showToggleSlice
    }
  }
}
</script>
