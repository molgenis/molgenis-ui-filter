<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      :class="filter.collapsible ? 'collapsable' : ''"
      @click="toggleCollapse"
    >
      <div
        class="title mr-3 px-1"
        :title="filter.label"
      >
        <font-awesome-icon
          v-if="filter.collapsible"
          icon="caret-right"
          :style="iconStyle"
          class="mr-2"
        />
        {{ filter.label }}
        <button
          v-if="canRemove"
          class="remove-button"
          @click.stop="removeFilter"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </b-card-header>

    <b-collapse
      :id="filter.id"
      :visible="isOpen"
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
    filter: {
      type: Object,
      default: () => {}
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
  computed: {
    iconStyle () {
      return {
        transform: `rotate(${this.filter.collapsed ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    },
    isOpen: function () {
      if (this.filter.collapsible) {
        return this.filter.collapsed
      }

      return true
    }
  },
  methods: {
    removeFilter () {
      this.filter.visible = false
    },
    toggleCollapse: function () {
      if (this.filter.collapsible) {
        this.filter.collapsed = !this.filter.collapsed
      }
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
    background: none;
    border: 0;
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
