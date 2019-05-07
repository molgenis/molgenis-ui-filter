<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header @click="collapsed = !collapsed">
      <i
        v-if="collapsed"
        class="fa fa-caret-right"
        aria-hidden="true"
      />
      <i
        v-else
        class="fa fa-caret-down"
        aria-hidden="true"
      />
      {{ label }}
    </b-card-header>
    <b-collapse v-model="collapsed">
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
  }
}
</script>
