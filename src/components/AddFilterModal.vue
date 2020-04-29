<template>
  <div>
    <b-dropdown text="Set filters" block variant="primary" boundary="viewport" dropright>
      <b-dropdown-text>Set filters</b-dropdown-text>
      <b-dropdown-form>
        <b-form-checkbox-group stacked v-model="selected" @input="changeFilters">
          <b-form-checkbox v-for="option in options" :key="option.name" :value="option.name">
            <span v-if="option.label">
              <span class="text-nowrap">{{option.label}} </span>
              <span class="text-secondary">
                <small><span class="text-nowrap">( {{option.name}} )</span></small>
              </span>
            </span>
            <span v-else>
              <span class="text-nowrap">{{option.name}} </span>
            </span>
            <span class="text-secondary">
              <small v-if="option.description"> - {{option.description}}</small>
            </span>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
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
      selected: this.value
    }
  },
  computed: {
    options () {
      return this.filters.map(it => ({
        name: it.name,
        label: it.label,
        description: it.description
      }))
    }
  },
  methods: {
    changeFilters () {
      this.$emit('input', this.selected)
    }
  }
})
</script>
