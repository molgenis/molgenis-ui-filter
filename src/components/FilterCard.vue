<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      class="drag-handle"
      :class="collapsable ? 'collapsable' : ''"
      @click="toggleState"
    >
      <div
        class="title mr-3 px-1"
        :title="label"
      >
        <font-awesome-icon
          v-if="collapsable"
          icon="caret-right"
          :style="iconStyle"
          class="mr-2"
        />
        {{ label }}
        <span
          v-if="canRemove"
          class="remove-button"
          @click.stop="removeFilter"
        >
          <font-awesome-icon icon="times" />
        </span>
      </div>
    </b-card-header>
    <b-collapse
      :id="name"
      v-model="isOpen"
    >
      <b-card-body>
        <b-form-group :description="description">
          <slot />
        </b-form-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCaretRight, faTimes)

export default Vue.extend({
  name: 'FilterCard',
  components: { FontAwesomeIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: () => true
    },
    collapsable: {
      type: Boolean,
      required: false,
      default: () => true
    },
    description: {
      type: String,
      required: false,
      default: () => ''
    },
    canRemove: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      isOpen: this.collapsable ? !this.collapsed : true
    }
  },
  computed: {
    iconStyle () {
      return {
        transform: `rotate(${this.isOpen ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    }
  },
  methods: {
    removeFilter () {
      this.$emit('removeFilter', this.name)
    },
    toggleState () {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
        return this.isOpen
      }
      return false
    }
  }
})
</script>

<style scoped>
  .card-header.collapsable {
    cursor: pointer;
  }
  .form-group {
    margin-bottom:0;
  }
  .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remove-button{
    transition: opacity 0.2s, color 0.2s;
    opacity: 0;
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
  .filter-card:hover .remove-button{
    opacity: 1;
  }
  .sortable-ghost{
    border-style: dashed;
  }
  .sortable-ghost > div{
    opacity: 0.2;
  }
</style>
