<template>
  <div>
    <b-dropdown
      ref="addFilter"
      variant="primary"
      boundary="window"
      menu-class="shadow ml-2"
      dropright
      no-caret
      block
    >
      <template v-slot:button-content>
        Change filters <font-awesome-icon
          icon="caret-right"
          class="ml-2"
        />
      </template>
      <b-dropdown-text>
        Change filters
        <span
          class="float-right remove-button"
          @click.stop="$refs.addFilter.hide(true)"
        ><font-awesome-icon icon="times" /></span>
      </b-dropdown-text>
      <b-dropdown-form>
        <b-form-checkbox
          v-for="option in filters"
          :key="option.name"
          :checked="selected.includes(option.name)"
          :class="{'ml-4':option.compound}"
          @change="checkboxHandler(option, $event)"
        >
          <span v-if="option.label">
            <span class="text-nowrap">{{ option.label }} </span>
            <span class="text-secondary">
              <small><span class="text-nowrap">( {{ option.name }} )</span></small>
            </span>
          </span>
          <span v-else>
            <span class="text-nowrap">{{ option.name }} </span>
          </span>
          <span class="text-secondary">
            <small v-if="option.description"> - {{ option.description }}</small>
          </span>
        </b-form-checkbox>
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCaretRight, faTimes)

export default Vue.extend({
  name: 'AddFilterModal',
  components: { FontAwesomeIcon },
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
  watch: {
    value: {
      handler (newValue) {
        this.selected = [...newValue]
      },
      immediate: true
    }
  },
  methods: {
    unique: (value, index, items) => items.indexOf(value) === index,
    checkboxHandler (option, state) {
      if (state) {
        this.selected.push(option.name)
      } else {
        this.selected = this.selected.filter(item => item !== option.name)
      }

      // parent compound toggle
      if (option.type === 'compound-title') {
        const subCompounds = this.filters.filter(item => item.compound === option.name).map(item => item.name)
        if (this.selected.includes(option.name)) {
          // Select all and make unique
          this.selected = [...this.selected, ...subCompounds].filter(this.unique)
        } else {
          // Deselect all
          this.selected = this.selected.filter(item => !subCompounds.includes(item))
        }
      }

      // child compound toggle
      if (option.compound) {
        const subCompounds = this.filters.filter(item => item.compound === option.compound).map(item => item.name)
        const allSelected = subCompounds.every(item => this.selected.includes(item))
        const noneSelected = subCompounds.every(item => !this.selected.includes(item))
        const partialSelected = !allSelected && !noneSelected
        if (allSelected) {
          this.selected = [option.compound, ...this.selected].filter(this.unique)
        }
        if (noneSelected) {
          this.selected = this.selected.filter(item => item !== option.compound)
        }
        if (partialSelected) {
          this.selected = this.selected.filter(item => item !== option.compound)
        }
      }
      this.$emit('input', this.selected)
    }
  }
})
</script>

<style scoped>
  .remove-button{
    transition: color 0.2s;
    height: inherit;
    width: 1.5em;
    text-align: center;
    display: inline-block;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .remove-button:hover{
    color: var(--danger);
  }
</style>
