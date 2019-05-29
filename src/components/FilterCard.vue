<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      :class="collapsable ? 'collapsable' : ''"
      @click="toggleState"
    >
      <font-awesome-icon
        v-if="collapsable"
        icon="caret-right"
        :style="iconStyle"
        class="mr-2"
      />
      {{ label }}
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
export default {
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
    toggleState () {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
        return this.isOpen
      }
      return false
    }
  }
}
</script>

<style scoped>
  .card-header.collapsable {
    cursor: pointer;
  }
  .form-group {
    margin-bottom:0;
  }
</style>
