<template>
  <b-input-group>
    <b-form-input
      v-model="filter.selection"
      :name="filter.name"
      :placeholder="filter.placeholder"
      trim
    />
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        @click.prevent="filter.selection=''"
      >
        <font-awesome-icon icon="times" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
  name: 'StringFilter',
  components: { FontAwesomeIcon },
  // eslint-disable-next-line vue/require-prop-types
  props: ['filter']
})
</script>
