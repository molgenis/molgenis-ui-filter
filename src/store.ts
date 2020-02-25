import axios from 'axios'
import data from '../tests/mockdata'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 15000
})

// @ts-ignore
api.entity = 'root_hospital_diagnosis'

const providers = {
  multiFilter: async function (query:any) {
    // @ts-ignore
    const metadata = await api.get(`metadata/${api.entity}`)
    const nameAttr = metadata.data.data.attributes.items.filter((i:any) => i.data.labelAttribute).map((i) => i.data.name)[0]
    // @ts-ignore
    const data = await api.get(`data/${api.entity}?q=${nameAttr}=like=${query}`)
    return data.data.items.map((i:any) => {
      return { id: i.data.id, name: i.data[nameAttr] }
    })
  }
}

const widget = {
  collapsed: true,
  collapsible: true
}

const filterState = {
  filters: [
    {
      id: 'multi-filter',
      label: 'Multi filter',
      maxVisibleOptions: 5,
      search: '',
      options: [],
      provider: providers.multiFilter,
      type: 'MultiFilter',
      selection: [], // Maps to b-form-checkbox-group model
      active: true
    },
    {
      id: 'search',
      label: 'Search',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'StringFilter',
      selection: 'test',
      active: false
    },
    {
      id: 'color',
      label: 'Color',
      bulkOperation: true,
      maxVisibleOptions: 5,
      options: [],
      provider: () => {
        return new Promise((resolve) => {
          resolve(data.checkboxOptions)
        })
      },
      type: 'checkbox-filter',
      selection: [],
      active: false
    },
    {
      id: 'number',
      label: 'Number',
      type: 'NumberFilter',
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
      useSlider: false,
      step: 1,
      selection: null,
      active: false
    },
    {
      id: 'age',
      label: 'Age',
      min: -10,
      max: 10,
      step: 0.01,
      type: 'RangeFilter',
      useSlider: true,
      selection: [null, null],
      active: false
    },
    {
      id: 'name',
      label: 'Name',
      description: 'Name of object',
      type: 'StringFilter',
      selection: null,
      active: false
    },
    {
      id: 'string',
      label: 'String',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'StringFilter',
      selection: null,
      active: false
    },
    {
      id: 'checkbox',
      label: 'Checkbox',
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: [],
      provider: () => {
        return new Promise((resolve) => {
          resolve(data.checkboxOptions)
        })
      },
      type: 'CheckboxFilter',
      selection: [],
      active: false
    },
    {
      id: 'checkbox-options',
      label: 'Checkbox lots of options',
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: [],
      provider: () => {
        return new Promise((resolve) => {
          resolve(data.checkboxOptions)
        })
      },
      type: 'CheckboxFilter',
      selection: null,
      active: false
    },
    {
      id: 'long-name',
      bulkOperation: true,
      label: 'Way too long name to really fit in the user interface',
      options: [],
      provider: () => {
        return new Promise(
          function (resolve) {
            resolve([{ id: 'no', name: 'No' }, { id: 'yes', name: 'Yes' }])
          })
      },
      type: 'CheckboxFilter',
      selection: null,
      active: false
    }
  ]
}

for (const filter of filterState.filters) {
  Object.assign(filter, widget)
}

export default filterState
