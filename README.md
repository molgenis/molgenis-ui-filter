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
| name                 | true     | -             | string: name and id of the filter |
| label                | true     |               | string: Name of the filter as used by the UI |
| description          | false    |               | Descriptive text that is used by the UI |
| collapsed            | false    | true          | boolean: Open/Closed state of the card that holds the filter |
| collapsable          | true     | true          | boolean: Can the card be collapsed. This will force the card to be open by default if set to false |
| type                 | true     | -             | Vue Object that renders the filter |

The `type` field takes a VUE object that renders a filter. Note that every object can have additional filter properties

### Additional filter properties
#### CheckboxFilter 

| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| options              | true     | -             | Describe the checkboxes. The value property is used as key and the text property is used as label by the UI |

*Options example*
```
[{ value: 'value1', text: 'Checkbox 1' }, { value: 'value2', text: 'Checkbox 2' }]
```

#### StringFilter
| name                 | required | default value | description | 
|----------------------|----------|---------------|-------------|
| placeholder          | false    | *undefined*   | Placeholder in the input field |


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
