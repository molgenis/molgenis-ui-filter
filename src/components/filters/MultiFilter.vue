<template>
  <div>
    <input v-model="query" type="text">

    <b-form-checkbox-group
      v-model="selection"
      :name="name"
      :options="maxOptions"
      stacked
    />

    <b-link
      v-if="inputOptions.length > maxVisibleOptions"
      class="toggle-select card-link"
      @click="showMoreToggled = !showMoreToggled"
    >
      {{ showMoreText }}
    </b-link>
  </div>
</template>

<script>
import axios from 'axios'

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
    endpoint: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    maxVisibleOptions: {
      type: Number,
      default: () => 3
    }
  },
  data () {
    return {
      showMoreToggled: false,
      selected: [],
      triggerQuery: Number,
      inputOptions: [],
      query: ''
    }
  },
  computed: {
    maxOptions: function () {
      if (this.showMoreToggled) {
        return this.inputOptions
      } else {
        return this.inputOptions.slice(0, this.maxVisibleOptions)
      }
    },
    selection: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
    },
    showMoreText () {
      if (this.showMoreToggled) {
        return 'Show less'
      } else {
        return `Show ${this.inputOptions.length - this.maxVisibleOptions} more`
      }
    }
  },
  watch: {
    query: function (newVal) {
      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }

      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)
        if (!newVal.length) {
          this.inputOptions = []
        } else {
          this.inputOptions = await this.fetchOptions()
        }
      }, 500)
    }
  },
  created () {
    this.api = axios.create({
      baseURL: this.endpoint.api,
      timeout: 15000,
      headers: { 'X-Custom-Header': 'foobar' }
    })
  },
  methods: {
    fetchOptions: async function () {
      // http://localhost:8080/api/metadata/root_hospital_diagnosis
      const metadata = await this.api.get(`metadata/${this.endpoint.entity}`)
      const nameAttr = metadata.data.data.attributes.items.filter((i) => i.data.labelAttribute).map((i) => i.data.name)[0]

      const data = await this.api.get(`data/${this.endpoint.entity}?q=${nameAttr}=like=${this.query}`)
      return data.data.items.map((i) => {
        return { value: i.data.id, text: i.data[nameAttr] }
      })
    },
    toggleSelect () {
      this.selection = this.selection && this.selection.length ? [] : this.resolvedOptions.map(option => option.value)
    }
  }
}
</script>
