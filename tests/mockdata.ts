
// API setup for testing filters.
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 15000
})

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

export default { api, checkboxOptions, checkboxLotsOptions, boolCheckboxes }
