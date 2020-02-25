<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="filter.search"
        :name="filter.name"
        :placeholder="filter.placeholder"
        trim
      />
      <b-input-group-append>
        <b-button
          variant="outline-secondary"
          :disabled="isLoading"
          @click.prevent="filter.search=''"
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
      v-if="slicedSelection.length"
      v-model="filter.selection"
      class="checkbox-list"
      :name="filter.name"
      :options="slicedSelection"
      stacked
    />

    <b-link
      v-if="filter.options.length > filter.maxVisibleOptions"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['filter'],
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
    slicedSelection: function () {
      if (this.showMoreToggled) {
        return this.filter.options
      } else {
        return this.filter.options.slice(0, this.maxVisibleOptions)
      }
    },
    showMoreText () {
      if (this.showMoreToggled) {
        return 'Show less'
      } else {
        return `Show ${this.filter.options.length - this.maxVisibleOptions} more`
      }
    }
  },
  store: ['filters'],
  watch: {
    'filter.search': function (search) {
      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }

      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)

        if (search.length) {
          this.isLoading = true
          try {
            this.filter.options = await this.filter.provider(search)
          } catch (err) {
            console.log('ERR', err)
          } finally {
            this.isLoading = false
          }
        } else {
          this.filter.options = []
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
