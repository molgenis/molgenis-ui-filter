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
          @click.prevent="query=''"
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
    <font-awesome-icon
      v-if="foundOptionCount === 100"
      icon="exclamation-triangle"
      class="warning text-danger"
      size="xs"
      title="There are 100 or more results found, only the first 100 are available. Please refine your search."
    />
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
library.add(faTimes)
library.add(faExclamationTriangle)
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
      selected: [],
      triggerQuery: Number,
      inputOptions: [],
      query: ''
    }
  },
  computed: {
    slicedOptions: function () {
      return this.inputOptions.slice(0, this.showCount)
    },
    foundOptionCount () {
      return this.inputOptions.length
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
      if (this.foundOptionCount - this.showCount <= this.maxVisibleOptions) {
        return `Show remaining ${this.maxVisibleOptions}`
      } else {
        return `Show ${this.maxVisibleOptions} more`
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
          this.showCount = this.maxVisibleOptions
          this.isLoading = true
          try {
            this.inputOptions = await this.options({
              'q': `${this.name}=q=(${this.query})` // this should be escaped using the rsql lib
            })
          } catch (err) {
            console.log(err)
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
.warning {
  position: absolute;
  right: 0.3rem;
  top: 3.3rem;
}

.warning:hover{
  cursor: pointer;
}

.checkbox-list {
  max-height: 250px;
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
