<template>
  <div>
    <input v-model="query" type="text">

    <div v-if="inputOptions && inputOptions.length >= 0">
      <b-form-checkbox-group
        v-model="selection"
        :options="inputOptions"
        :name="name"
      />
    </div>
  </div>
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
    options: {
      type: [Function],
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: [],
      triggerQuery: Number,
      inputOptions: [],
      query: ''
    }
  },
  computed: {
    selection: {
      get () {
        return this.query
      },
      set (value) {
        console.log('EMIT')
        // this.$emit('input', value)
      }
    }
  },
  watch: {
    query: function (newVal) {
      this.options().then(response => {
        this.inputOptions = response
      })
    }
  },
  created () {
    this.options().then(response => {
      this.inputOptions = response
    })
  }
}
</script>
