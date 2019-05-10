# molgenis-ui-filter

## Filter Container

The filter container takes a descriptive input array to create a set of filters. It will also require a 2 way bound output object to receive the filters state

```
<FilterContainer
  v-model="selections"
  :filters="filters"
/>
```

### Filter input object specifications

```
filters: [ {
    name: 'search',
    label: 'Search',
    description: 'search by name',
    initiallyCollapsed: true,
    placeholder: 'test',
    type: SearchFilterVueObject
}, {
    name: 'country',
    label: 'Countries',
    initiallyCollapsed: false,
    options: [{ value: 'nl', text: 'Nederland' }, { value: 'de', text: 'Duitsland' }, { value: 'be', text: 'België' }],
    type: CheckboxVueObject
}]
```

Every filter will have the following global properties:

| name | required | description | 
|------|----------|-------------|
| name | true | string: name and id of the filter |
| label | false | string: Name of the filter as used by the UI |
| description | false |Descriptive text that is used by the UI |
| initiallyCollapsed | true | boolean: Open/Closed state of the card that holds the filter |
| type | true | Vue Object that renders the filter |

The `type` field takes a VUE object that renders a filter. Note that every object can have additional filter properties

### Additional filter properties
#### CheckboxFilter 
`options`: Describe the checkboxes. The value property is used as key and the text property is used as label by the UI
```
[{ value: 'value1', text: 'Checkbox 1' }, { value: 'value2', text: 'Checkbox 2' }]
```

#### StringFilter
`placeholder`: Placeholder in the input field


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

### Run your tests
```
yarn run test
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
