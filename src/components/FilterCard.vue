<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header @click="initiallyCollapsed = !initiallyCollapsed">
      <i
        v-if="initiallyCollapsed"
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
    <b-collapse
      :id="name"
      v-model="initiallyCollapsed"
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
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    description: {
      type: String,
      default: () => undefined
    }
  },
  data () {
    return {
      initiallyCollapsed: !this.collapsed
    }
  }
}
</script>
