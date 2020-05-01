<template>
  <div>
    <b-dropdown variant="primary" boundary="viewport" menu-class="shadow ml-2" ref="addFilter" dropright no-caret block>
      <template v-slot:button-content>
        Set filters <font-awesome-icon icon="caret-right" class="ml-2" />
      </template>
      <b-dropdown-text>
        Set filters
        <span class="float-right remove-button"
              @click.stop="$refs.addFilter.hide(true)"
        ><font-awesome-icon icon="times" /></span>
      </b-dropdown-text>
      <b-dropdown-form>
        <b-form-checkbox-group stacked v-model="selected" @input="changeFilters">
          <b-form-checkbox v-for="option in options" :key="option.name" :value="option.name" :class="{'ml-4':option.compound}">
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
  computed: {
    options () {
      return this.filters.map(it => ({
        name: it.name,
        label: it.label,
        description: it.description,
        compound: it.compound
      }))
    }
  },
  methods: {
    remove () {

    },
    changeFilters () {
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
