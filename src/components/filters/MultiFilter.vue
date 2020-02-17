<template>
  <div>
    <input
      type="text"
      @keyup="fetchOptions"
      @paste="fetchOptions"
    >
    <div v-if="inputOptions && inputOptions.length >= 0">
      <b-form-checkbox-group
        v-model="selected"
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
      triggerQuery: Function,
      inputOptions: [],
      query: String
    }
  },
  computed: {
    selection: {
      get () {
        return this.query
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  created () {
    this.options().then(response => {
      this.inputOptions = response.options
    })
  },
  methods: {
    fetchOptions () {
      clearInterval(triggerQuery)
      triggerQuery = setInterval(function () {
        this.$emit('fetch', this.query)
        clearInterval(triggerQuery)
      }, 700)
    }
  }
}
</script>
