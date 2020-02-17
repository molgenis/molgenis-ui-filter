<template>
  <div>
    <b-form-checkbox-group
      v-model="filter.selection"
      stacked
      :options="visibleOptions"
      :name="filter.name"
      value-field="id"
      text-field="name"
    />
    <span v-if="bulkOperation">
      <b-link
        v-if="filter.options.length > filter.maxVisibleOptions"
        class="card-link"
        @click="showMoreToggled = !showMoreToggled"
      >
        {{ showMoreText }}
      </b-link>

      <b-link
        v-if="filter.options.length > filter.maxVisibleOptions"
        class="toggle-select card-link"
        @click="toggleSelect"
      >
        {{ filter.selection.length ? 'Deselect all' : 'Select all' }}
      </b-link>
    </span>
  </div>
</template>

<style>
  .card-link { font-style: italic; font-size: small; }
</style>

<script>
export default {
  props: {
    bulkOperation: {
      type: Boolean,
      required: false,
      default: () => true
    },
    filter: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      showMoreToggled: false
    }
  },
  computed: {
    visibleOptions () {
      if (this.showMoreToggled) {
        return this.filter.options
      }
      return this.filter.options.slice(0, this.filter.maxVisibleOptions)
    },
    showMoreText () {
      if (this.showMoreToggled) {
        return 'Show less'
      }

      return `Show ${this.filter.options.length - this.filter.maxVisibleOptions} more`
    }

  },
  created: async function () {
    this.filter.options = await this.filter.provider()
  },
  methods: {
    toggleSelect () {
      if (this.filter.selection.length) {
        this.filter.selection = []
      } else {
        this.filter.selection = this.visibleOptions.map((f) => f.id)
      }
    }
  }
}
</script>
