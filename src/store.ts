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

const state = {
  filters: {
    canEdit: true,
    available: [
      {
        active: true,
        label: 'DateTime filter',
        max: null,
        min: null,
        opens: 'right',
        range: true,
        selection: null, // range ? [null, null] : null
        time: true,
        type: 'DateTimeFilter'
      },
      {
        active: true,
        label: 'Multi filter',
        maxVisibleOptions: 5,
        options: [],
        provider: providers.multiFilter,
        search: '',
        selection: [],
        type: 'MultiFilter'
      },
      {
        active: false,
        description: 'search by string',
        label: 'Search',
        placeholder: 'placeholder',
        selection: 'test',
        type: 'StringFilter'
      },
      {
        active: true,
        bulkOperation: true,
        label: 'Color',
        maxVisibleOptions: 5,
        options: [],
        provider: () => {
          return new Promise((resolve) => {
            resolve(data.checkboxOptions)
          })
        },
        selection: [],
        type: 'CheckboxFilter'
      },
      {
        active: false,
        label: 'Number',
        max: 15,
        min: -5,
        selection: null,
        step: 1,
        type: 'NumberFilter',
        useSlider: false
      },
      {
        active: false,
        label: 'Age',
        max: 10,
        min: -10,
        selection: [null, null],
        step: 0.01,
        type: 'RangeFilter',
        useSlider: true
      },
      {
        active: false,
        description: 'Name of object',
        label: 'Name',
        selection: null,
        type: 'StringFilter'
      },
      {
        active: false,
        description: 'search by string',
        label: 'String',
        placeholder: 'placeholder',
        selection: null,
        type: 'StringFilter'
      },
      {
        active: false,
        bulkOperation: true,
        label: 'Checkbox',
        maxVisibleOptions: 1,
        options: [],
        provider: () => {
          return new Promise((resolve) => {
            resolve(data.checkboxOptions)
          })
        },
        selection: [],
        type: 'CheckboxFilter'
      },
      {
        active: false,
        bulkOperation: true,
        label: 'Way too long name to really fit in the user interface',
        maxVisibleOptions: 1,
        options: [],
        provider: () => {
          return new Promise((resolve) => {
            resolve(data.checkboxOptions)
          })
        },
        selection: null,
        type: 'CheckboxFilter'
      }
    ]
  }
}

let id = 1
for (const filter of state.filters.available) {
  Object.assign(filter, {
    id,
    collapsed: true,
    collapsible: true
  })

  id += 1
}

export default state
