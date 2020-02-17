<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="filter.search"
        :class="{'is-invalid': isInvalid}"
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
      v-if="visibleOptions.length"
      v-model="filter.selection"
      class="checkbox-list"
      :name="filter.name"
      value-field="id"
      value="accepted"
      :options="visibleOptions"
      text-field="name"
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
      isInvalid: false,
      // Holds additional context like name.
      selectionOptions: [],
      showMoreToggled: false,
      triggerQuery: Number
    }
  },
  computed: {
    visibleOptions: function () {
      // Always show selected options:
      if (this.showMoreToggled) {
        return this.filter.options
      }

      return this.filter.options.slice(0, this.filter.maxVisibleOptions)
    },
    showMoreText () {
      if (this.showMoreToggled) {
        return 'Show less'
      }

      return `Show ${this.filter.options.length - this.filter.maxVisibleOptions} more`
    }
  },
  watch: {
    'filter.search': function (search) {
      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }

      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)
        // (!) Do not remove selected options from the state.
        const selected = this.filter.options.filter((f) => this.filter.selection.includes(f.id))

        if (search.length) {
          this.isLoading = true
          try {
            // Supplement with addional options.
            const newOptions = (await this.filter.provider(search)).filter((f) => !selected.find((i) => i.id === f.id))
            this.isInvalid = false
            this.filter.options = selected.concat(newOptions)
          } catch (err) {
            this.isInvalid = true
          } finally {
            this.isLoading = false
          }
        } else {
          this.filter.options = selected
        }
      }, 250)
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

.is-invalid {
  background-image: none;
}
</style>

<style>
.card-link { font-style: italic; font-size: small; }
</style>
