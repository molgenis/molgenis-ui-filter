[![codecov](https://codecov.io/gh/molgenis/molgenis-ui-form/branch/master/graph/badge.svg)](https://codecov.io/gh/molgenis/molgenis-ui-form)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# molgenis-ui-filter

## Filter Container

The filter container takes a descriptive input array to create a set of filters. It will also require a 2 way bound output object to receive the filters state

```
<filter-container
  v-model="selections"
  :filters="filters"
  :filters-shown="filtersShown"
  :can-edit="true"
/>
```
### Properties

- `selections`: Will hold the settings set in filters.
- `filters`: A definition list of all possible filters.
- `filtersShown`: A array of filter names that will be shown.
- `can-edit`: if true you will be able to add, move and remove filters.

### Events

- `update`: this event is fired when filtersShown is updated, it will return a new list of selected filters

### Filter input object specifications

```
filters: [ {
    name: 'search',
    label: 'Search',
    description: 'search by name',
    initiallyCollapsed: true,
    placeholder: 'test',
    type: 'string-filter'
}, {
    name: 'country',
    label: 'Countries',
    initiallyCollapsed: false,
    options: [{ value: 'nl', text: 'Nederland' }, { value: 'de', text: 'Duitsland' }, { value: 'be', text: 'België' }],
    type: 'checkbox-filter'
}]
```

Every filter will have the following global properties:

| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| name                 | true     | *na*          | string: name and id of the filter |
| label                | false    |               | string: name of the filter as used by the UI |
| description          | false    |               | descriptive text that is used by the UI |
| collapsed            | false    | true          | boolean: Open/Closed state of the card that holds the filter |
| collapsable          | false    | true          | boolean: Can the card be collapsed. This will force the card to be open by default if set to false |
| type                 | true     | *na*          | vue object that renders the filter |
| value                | false    | empty         | the (pre)selected option(s) | 

The `type` field takes a VUE object that renders a filter. Note that every object can have additional filter properties

### Additional filter properties
#### CheckboxFilter 

| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| options              | true     | *na*          | describe the checkboxes. This is a function holding a promise holding the options (see example below) |
| bulkOperation        | false    | true          | adds 'select all' and or 'Deselect all' button |
| maxVisibleOptions    | false    | undefined *(show all options)* | limit the amount of initially shown options | 

*options example*
```
() => {
    return new Promise(
        function (resolve) {
            resolve([{ value: 'value1', text: 'Checkbox 1' }, { value: 'value2', text: 'Checkbox 2' }])
        }
    )
}
```

#### DateTimefilter

| name                 | required | default value    | description | 
|----------------------|----------|------------------|-------------|
| max                  | false    | null `: string`  | Set the minimal date you can select, needs to be able to be parsed by the Date object |
| min                  | false    | null `: string`  | Set the maximum date you can select, needs to be able to be parsed by the Date object | 
| opens                | false    | 'right' `: string` | Set the alignment of the popup. Possible options: 'left', 'right', 'center' | 
| time                 | false    | true `: boolean` | Add a time selection to the data time picker | 
| range                | false    | true `: boolean` | Add a range selection to be able to make a from-to selection | 

#### Multifilter

The multifilter is a composite filter. It uses a searchbox, which searches for options. 
The usecase is to generate a list of checkboxes based on a user query (capped to first 100) when the options are of _n_ length.

| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| options              | true     | *na* `: Function` | describe the checkboxes. This is a function returns a promise which can query and return options (see example below) |
| placeholder          | false    | empty `: String` | fill the placeholder in the searchbox | 
| maxVisibleOptions    | false    | undefined `: Number` | limit the amount of initially shown options by _n_ | 

*options example*
```
(params: object) => {
  const data = await axios.get(url, { params })

  return Promise.resolve(
    data.data.items.map((i: any) => {
      return { value: i.data[*idName*], text: i.data[*attrName*] }
    })
  )
}
```

#### StringFilter
| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| placeholder          | false    |               | Placeholder in the input field |

#### NumberFilter, RangeFilter
| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| min                  | false    |               | minimal posible value |
| max                  | false    |               | maximal posible value |
| step                 | false    | 1             | step size of slider and up/down buttons |
| useSlider            | false    | false         | show a slider to help pick a number |

### Resulting output object

The resulting filter status is an object that holds the name fields of the filter description object and the resulting selected values. Note the 2 way vue binding.
Feed in the default values by setting them here on object creation.

```
selections: {
  search: '',
  country: ['nl']
},
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### How to commit
We use conventional commits to generate changelogs and release notes. Please check: https://www.conventionalcommits.org/

**Example**
```
git commit file.ext -m "fix(file.ext): fixes something"
```

### How to publish
Each time a PR is merged a release will be done to NPM. The CHANGELOG.md and GitHub release will be ammended. 

The version of the package is based upon convential commits. Check: http://commitizen.github.io/cz-cli/.
