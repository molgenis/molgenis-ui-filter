<template>
  <div class="card filter-card">
    <div class="card-header filter-header" @click.prevent="collapsed = !collapsed">
      <i class="fa fa-caret-right" aria-hidden="true" v-if="collapsed"></i>
      <i class="fa fa-caret-down" aria-hidden="true" v-else></i>
      {{label}}
    </div>
    <div class="card-body" v-if="!collapsed">
      <div class="input-group">
        <slot></slot>
      </div>
      <small v-if="description" class="form-text text-muted">{{description}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterCard',
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

<style scoped>
  .card{
    margin-bottom:20px;
  }
</style>
