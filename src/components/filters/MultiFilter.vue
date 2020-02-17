<template>
  <div>
    <input
      v-model="query"
      type="text"
      @keyup="fetchOptions"
      @paste="fetchOptions"
    >
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
      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }
      // bind it, due to scope.
      const self = this

      this.triggerQuery = setTimeout(function () {
        clearTimeout(self.triggerQuery)
        self.$emit('fetch', self.query)
        console.log(self.query)
      }, 500)
    }
  }
}
</script>
