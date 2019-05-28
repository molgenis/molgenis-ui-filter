<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header @click="collapsed = !collapsed">
      <font-awesome-icon
        icon="caret-right"
        :style="iconStyle"
        class="mr-2"
      />
      {{ label }}
    </b-card-header>
    <b-collapse
      :id="name"
      v-model="collapsed"
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
      required: true
    },
    description: {
      type: String,
      default: () => undefined
    }
  },
  data () {
    return {
      collapsed: this.initiallyCollapsed
    }
  },
  computed: {
    iconStyle () {
      return {
        transform: `rotate(${this.collapsed ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    }
  }
}
</script>

<style scoped>
  .card-header {
    cursor: pointer;
  }
</style>
