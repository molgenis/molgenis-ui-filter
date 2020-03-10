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
          :disabled="isLoading"
          @click.prevent="query= ''"
        >
          <font-awesome-icon
            v-if="isLoading"
            icon="spinner"
            class="fa-spin"
            size="xs"
          />
          <font-awesome-icon
            v-else
            icon="times"
          />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-form-checkbox-group
      v-if="slicedOptions.length"
      v-model="selection"
      class="checkbox-list"
      :name="name"
      :options="slicedOptions"
      stacked
    />

    <b-link
      v-if="showCount < inputOptions.length"
      class="card-link"
      @click="showMore"
    >
      {{ showMoreText }}
    </b-link>
    <font-awesome-icon
      v-if="foundOptionCount >= 100"
      v-b-popover.hover="'There are 100 or more results found, only the first 100 are available. Please refine your search.'"
      icon="exclamation-triangle"
      class="warning text-danger"
    />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faExclamationTriangle, faSpinner)

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
    options: {
      type: Function,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    maxVisibleOptions: {
      type: Number,
      default: () => 10
    }
  },
  data () {
    return {
      showCount: 0,
      isLoading: false,
      triggerQuery: Number,
      inputOptions: [],
      query: ''
    }
  },
  computed: {
    selection: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
    },
    slicedOptions: function () {
      return this.inputOptions.slice(0, this.showCount)
    },
    foundOptionCount () {
      return this.inputOptions.length
    },
    showMoreText () {
      const remaining = this.foundOptionCount - this.showCount
      if (remaining <= this.maxVisibleOptions) {
        return `Show remaining ${remaining}`
      } else {
        return `Show ${this.maxVisibleOptions} more`
      }
    }
  },
  watch: {
    query: function (newVal) {
      const previousSelection = this.inputOptions.filter(
        option => this.selection.indexOf(option.value) >= 0
      )
      this.inputOptions = previousSelection

      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }
      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)
        if (newVal.length) {
          this.showCount = this.maxVisibleOptions
          this.isLoading = true
          try {
            const fetched = await this.options(this.query)
            const valuesPresent = previousSelection.map(prev => prev.value)

            if (valuesPresent) {
              const difference = fetched.filter(prev => !valuesPresent.includes(prev.value))
              this.inputOptions = previousSelection.concat(difference)
            } else {
              this.inputOptions = fetched
            }
          } catch (err) {
          } finally {
            this.isLoading = false
          }
        }
      }, 500)
    }
  },
  created () {
    this.showCount = this.maxVisibleOptions
  },
  methods: {
    showMore () {
      this.showCount += this.maxVisibleOptions
    }
  }
}
</script>

<style scoped>

.warning:hover {
  cursor: pointer;
}

.checkbox-list {
  max-height: 16rem;
  overflow-y: auto;
  margin: 0.75rem 0;
}
</style>

<style>
.card-link {
  font-style: italic;
  font-size: small;
}
</style>
