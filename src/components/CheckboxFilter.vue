<template>
  <div>
    <fieldset :name="name" role="group" class="pt-2 b-form-group form-group">
      <div role="group" tabindex="-1" class="custom-controls-stacked">
        <div class="custom-control custom-checkbox" 
          v-for="(option, index) in visibleOptions" 
          :key="option.value"
        >
          <input :id="`option-${name}-${index}`"
            type="checkbox"
            :name="name"
            autocomplete="off"
            class="custom-control-input"
            :checked="value.includes(option.value)"
            @change="(event) => itemClick(option.value, event.target.checked)">
          <label :for="`option-${name}-${index}`" class="custom-control-label"><span>{{option.label}}</span></label>
        </div>
      </div>
    </fieldset>
    <a href="#" target="_self" class="toggle-slice card-link" @click.prevent="toggleSlice" v-if="showToggleSlice">{{toggleSliceText}}</a>
    <a href="#" target="_self" class="toggle-select card-link" @click.prevent="toggleSelect" >{{toggleSelectText}}</a>
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
    itemClick (value, checked) {
      if (checked) {
        this.$emit('input', [...this.value, value])
      } else {
        let leftover = this.value.filter(it => it !== value)
        if (leftover.length === 0) {
          leftover = undefined
        }
        this.$emit('input', leftover)
      }
    },
    toggleSelect () {
      this.$emit('input', this.value && this.value.length ? undefined : this.options.map(option => option.value))
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
