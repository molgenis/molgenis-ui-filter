/* istanbul ignore file */
// API setup for testing filters.
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 15000
})

// Prevent triggering options multiple times.
let cache:any = { params: {}, results: null }

const multifilterOptions = async (params: object) => {
  if (params === cache.params) return cache.results
  cache.params = params

  const data = await api.get(`/data/root_hospital_diagnosis`, { params })

  cache.results = data.data.items.map((i: any) => {
    return { value: i.data.id, text: i.data['disease'] }
  })

  return cache.results
}

const checkboxOptions =
  [
    { value: 'red', text: 'Red' },
    { value: 'green', text: 'Green' },
    { value: 'blue', text: 'Blue' }
  ]

const checkboxLotsOptions = [
  { value: 'red', text: 'Red' },
  { value: 'green', text: 'Green' },
  { value: 'blue', text: 'Blue' },
  { value: 'yellow', text: 'Yellow' },
  { value: 'white', text: 'White' },
  { value: 'purple', text: 'Purple' },
  { value: 'black', text: 'Black' }
]

const boolCheckboxes = [{ value: 'no', text: 'No' }, { value: 'yes', text: 'Yes' }]

export default { api, multifilterOptions, checkboxOptions, checkboxLotsOptions, boolCheckboxes }
