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

    <b-form-checkbox-group
      v-if="slicedOptions.length"
      v-model="selection"
      class="checkbox-list"
      :name="name"
      :options="slicedOptions"
      stacked
    />

    <b-link
      v-if="inputOptions.length > maxVisibleOptions"
      class="card-link"
      @click="showMoreToggled = !showMoreToggled"
    >
      {{ showMoreText }}
    </b-link>
  </div>
</template>

<script>
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
    options: {
      type: [Function],
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
      isLoading: false,
      showMoreToggled: false,
      selected: [],
      triggerQuery: Number,
      inputOptions: [],
      query: ''
    }
  },
  computed: {
    slicedOptions: function () {
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
          try {
            this.inputOptions = await this.options(this.query)
          } catch (err) {} finally {
            this.isLoading = false
          }
        }
      }, 500)
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

<style>
.card-link { font-style: italic; font-size: small; }
</style>
