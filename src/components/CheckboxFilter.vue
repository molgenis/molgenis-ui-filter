<template>
  <div>
    <b-form-checkbox-group
      v-model="selection"
      stacked
      :options="visibleOptions"
      :name="name"
    />
    <b-link
      v-if="showToggleSlice"
      class="toggle-slice card-link"
      @click.prevent="toggleSlice"
    >
      {{ toggleSliceText }}
    </b-link>
    <b-link
      class="toggle-select card-link"
      @click.prevent="toggleSelect"
    >
      {{ toggleSelectText }}
    </b-link>
  </div>
</template>

<style>
  .card-link { font-style: italic; font-size: small; }
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => undefined
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    maxVisibleOptions: {
      type: Number,
      default: () => undefined
    }
  },
  data () {
    return {
      sliceOptions: this.maxVisibleOptions && this.options && this.maxVisibleOptions < this.options.length
    }
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
  watch: {
    options () {
      this.sliceOptions = this.showToggleSlice
    },
    maxVisibleOptions () {
      this.sliceOptions = this.showToggleSlice
    }
  },
  methods: {
    toggleSelect () {
      this.selection = this.selection && this.selection.length ? [] : this.options.map(option => option.value)
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    }
  }
}
</script>
