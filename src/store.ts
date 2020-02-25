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
      return { value: i.data.id, text: i.data[nameAttr] }
    })
  }
}

export default {
  filters: [
    {
      name: 'multi-filter',
      label: 'Multi filter',
      collapsed: false,
      search: '',
      options: [],
      provider: providers.multiFilter,
      type: 'multi-filter',
      selection: [],
      visible: true
    },
    {
      name: 'search',
      label: 'Search',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'string-filter',
      collapsable: false,
      selection: 'test',
      visible: false
    },
    {
      name: 'color',
      label: 'Color',
      collapsed: false,
      bulkOperation: true,
      options: () => {
        return new Promise(
          function (resolve) {
            resolve(data.checkboxOptions)
          })
      },
      type: 'checkbox-filter',
      active: false,
      visible: false
    },
    {
      name: 'number',
      label: 'Number',
      collapsed: false,
      type: 'number-filter',
      selection: null,
      visible: false
    },
    {
      name: 'age',
      label: 'Age',
      collapsed: false,
      min: -10,
      max: 10,
      step: 0.01,
      type: 'range-filter',
      selection: null,
      visible: false
    },
    {
      name: 'name',
      label: 'Name',
      description: 'Name of object',
      type: 'string-filter',
      collapsed: false,
      selection: null,
      visible: false
    },
    {
      name: 'string',
      label: 'String',
      description: 'search by string',
      placeholder: 'placeholder',
      type: 'string-filter',
      collapsable: true,
      collapsed: false,
      selection: null,
      visible: false
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      collapsed: false,
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: () => {
        return new Promise(
          function (resolve) {
            resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
          })
      },
      type: 'checkbox-filter',
      selection: null,
      visible: false
    },
    {
      name: 'checkbox-options',
      label: 'Checkbox lots of options',
      collapsed: false,
      bulkOperation: true,
      maxVisibleOptions: 1,
      options: () => {
        return new Promise(
          function (resolve) {
            resolve([{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }])
          })
      },
      type: 'checkbox-filter',
      selection: null,
      visible: false
    },
    {
      bulkOperation: true,
      collapsed: true,
      label: 'Way too long name to really fit in the user interface',
      name: 'long-name',
      options: () => {
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
