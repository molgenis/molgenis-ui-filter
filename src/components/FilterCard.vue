<template>
  <b-card no-body class="mb-2">
    <b-card-header @click="collapsed = !collapsed">
      <i class="fa fa-caret-right" aria-hidden="true" v-if="collapsed"></i>
      <i class="fa fa-caret-down" aria-hidden="true" v-else></i>
      {{label}}
    </b-card-header>
    <b-collapse v-model="collapsed">
      <b-card-body>
        <b-form-group :description="description">
          <slot></slot>
        </b-form-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      collapsed: this.initiallyCollapsed
    }
  },
  props: {
    label: String,
    description: String
  }
}
</script>
