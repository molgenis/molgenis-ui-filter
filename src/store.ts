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

export default {
  filters: [
    {
      id: 'multi-filter',
      label: 'Multi filter',
      collapsed: false,
      collapsible: true,
      maxVisibleOptions: 5,
      search: '',
      options: [],
      provider: providers.multiFilter,
      type: 'multi-filter',
      selection: [], // Maps to b-form-checkbox-group model
      visible: true
    },
    {
      id: 'search',
      label: 'Search',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'string-filter',
      collapsible: false,
      selection: 'test',
      visible: false
    },
    {
      id: 'color',
      label: 'Color',
      collapsed: true,
      collapsible: true,
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
      visible: true
    },
    {
      id: 'number',
      label: 'Number',
      collapsed: true,
      collapsible: true,
      type: 'number-filter',
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
      useSlider: false,
      step: 1,
      selection: null,
      visible: true
    },
    {
      id: 'age',
      label: 'Age',
      collapsed: true,
      collapsible: true,
      min: -10,
      max: 10,
      step: 0.01,
      type: 'range-filter',
      useSlider: true,
      selection: [null, null],
      visible: true
    },
    {
      id: 'name',
      label: 'Name',
      description: 'Name of object',
      type: 'string-filter',
      collapsed: false,
      collapsible: true,
      selection: null,
      visible: false
    },
    {
      id: 'string',
      label: 'String',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'string-filter',
      collapsible: true,
      collapsed: false,
      selection: null,
      visible: false
    },
    {
      id: 'checkbox',
      label: 'Checkbox',
      collapsible: true,
      collapsed: false,
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: [],
      provider: () => {
        return new Promise((resolve) => {
          resolve(data.checkboxOptions)
        })
      },
      type: 'checkbox-filter',
      selection: null,
      visible: true
    },
    {
      id: 'checkbox-options',
      label: 'Checkbox lots of options',
      collapsed: false,
      collapsible: true,
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: [],
      provider: () => {
        return new Promise((resolve) => {
          resolve(data.checkboxOptions)
        })
      },
      type: 'checkbox-filter',
      selection: null,
      visible: false
    },
    {
      id: 'long-name',
      bulkOperation: true,
      collapsed: true,
      collapsible: true,
      label: 'Way too long name to really fit in the user interface',
      options: [],
      provider: () => {
        return new Promise(
          function (resolve) {
            resolve([{ value: 'no', text: 'No' }, { value: 'yes', text: 'Yes' }])
          })
      },
      type: 'checkbox-filter',
      selection: null,
      visible: false
    }
  ]
}
