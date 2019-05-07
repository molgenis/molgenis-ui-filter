<template>
  <div>
    <fieldset id="__BVID__74" role="group" class="pt-2 b-form-group form-group">
      <div role="group" tabindex="-1" class="custom-controls-stacked">
        <div class="custom-control custom-checkbox" v-for="option in visibleOptions" :key="option.id">
          <input :id="option.id" type="checkbox" :name="name" autocomplete="off" class="custom-control-input" :checked="selected.includes(option.id)">
          <label :for="option.id" class="custom-control-label"><span>{{option.label}}</span></label>
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
    selected: Array,
    initiallyCollapsed: Boolean,
    maxVisibleOptions: Number
  },
  computed: {
    selection: {
      get () {
        return this.selected
      },
      set (selected) {
        this.$emit('input', selected)
      }
    },
    visibleOptions () {
      return this.sliceOptions ? this.options.slice(0, this.maxVisibleOptions) : this.options
    },
    showToggleSlice () {
      return this.maxVisibleOptions && this.maxVisibleOptions < this.options.length
    },
    toggleSelectText () {
      return this.selection.length ? 'Deselect all' : 'Select all'
    },
    toggleSliceText () {
      return this.sliceOptions ? `Show ${this.options.length - this.maxVisibleOptions} more` : 'Show less'
    }
  },
  methods: {
    toggleSelect () {
      this.selection = this.selection && this.selection.length ? [] : this.options.map(option => option.id)
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
