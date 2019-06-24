<template>
  <div>
    <b-button
      v-b-modal.modal-add-filter
      variant="outline-secondary"
      class="w-100 mt-2 add-button"
    >
      Add a filter
    </b-button>

    <b-modal
      id="modal-add-filter"
      title="Add filter"
      @ok="addFilter"
      @show="resetModal"
    >
      <b-form-select
        v-model="selected"
        name="filter"
        :options="options"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'AddFilterModal',
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: null
    }
  },
  computed: {
    options () {
      return this.filters.map(it => ({
        value: it.name,
        text: it.label
      }))
    }
  },
  methods: {
    resetModal () {
      this.selected = this.filters[0].name
    },
    addFilter () {
      if (this.selected != null) {
        this.$emit('input', [ ...this.value, this.selected ])
      }
    }
  }
}
</script>
