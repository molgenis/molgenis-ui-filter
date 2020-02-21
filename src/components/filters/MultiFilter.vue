<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="query"
        :name="name"
        :placeholder="placeholder"
        trim
      />
      <b-input-group-append>
        <b-button
          variant="outline-secondary"
          @click.prevent="query=''"
        >
          <font-awesome-icon
            v-if="isLoading"
            class="fa-spin"
            icon="spinner"
          />
          <font-awesome-icon
            v-else
            icon="times"
          />
        </b-button>
      </b-input-group-append>
    </b-input-group>

    <b-form-checkbox-group
      v-model="selection"
      class="checkbox-list"
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)
library.add(faSpinner)

export default {
  components: { FontAwesomeIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: () => ''
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
      isLoading: false,
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
          this.isLoading = true
          this.inputOptions = await this.fetchOptions()
          this.isLoading = false
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

<style scoped>
.checkbox-list {
  max-height: 250px;
  overflow-y: auto;
  margin: 0.75rem 0;
}
</style>
