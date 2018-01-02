# vue-suggestion

Suggestion list input for Vue.js, inspired by [v-autocomplete](https://github.com/paliari/v-autocomplete).  
Your search engine, your CSS, your everything...

### Checkout [demo](https://iamstevendao.github.io/vue-suggestion/).

<p align="center">
<img width="600px" alt="In-action GIF" src="https://thumbs.gfycat.com/ThirstyFearlessBunting-size_restricted.gif"/>
</p>

## Installation
- **yarn**: `yarn add vue-suggestion`  
- **npm**: `npm i --save vue-suggestion`

## Usage

- Import `vue-suggestion` into your Vue component and use as a normal component:
    ```html
    <template>
    ...
      <vue-suggestion></vue-suggestion>
    ...
    <template>
    <script>
    import VueSuggestion from 'vue-suggestion'   
    export default {
      ...
      components: {
        VueSuggestion
      }
    }
    </script>
    ```
#### !!You can also use it as a custom field of [vue-form-generator](https://github.com/vue-generators/vue-form-generator).

### Props
```js
[
  'template', // (required, vue component) template of suggestion list items, should be a Vue component
  'setLabel', // (required, function) a function that sets the value of input after a suggestion is selected
  'items', // (required, Array) suggestion array, should be updated dynamically after onInputChange()
  'minLen', // (default: 2, Integer) minimun number of characters inputted to search
  'disabled', // (default: false, Boolean) 
  'placeholder' // (default: '', String)
]
```
### Events
```
@onInputChange(String) // fires when the input changes with the argument is the current input text.
@onItemSelected(Object) // fires when user selects a suggestion
```
### Style

Just overwrite their css classes:

```stylus
.vue-suggestion
  .vue-suggestion-input-group
    .vue-suggestion-input
  .vue-suggestion-list
    .vue-suggestion-list-item
      &.vue-suggestion-item-active
```

### Example

```html
<template>
  <vue-suggestion :items="items" 
                  v-model="item", 
                  :setLabel="setLabel",
                  :template="itemTemplate", 
                  @onInputChange="inputChange", 
                  @onItemSelected="itemSelected">
  </vue-suggestion>
</template>

<script>
import itemTemplate from './ItemTemplate.vue';
export default {
  data () {
    return {
      item: {},
      items: [
        { id: 1, name: 'Golden Retriever'},
        { id: 2, name: 'Cat'},
        { id: 3, name: 'Squirrel'},
      ],
      itemTemplate,
    }
  },
  methods: {
    setLabel (item) {
      return item.name;
    },
    inputChange (text) {
      // your search method
      this.items = items.filter(item => item.name.contains(text));
      // now `items` will be showed in the suggestion list
    },
  },
};
</script>
```

**ItemTemplate example:**

```html
<template>
  <div>
    <b>#{{item.id}}</b>
    <span>{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  }
}
</script>
```

## Demo Usage

```bash

# install dependencies
$ yarn/npm install

# compile demo for development
$ yarn/npm dev

# open Browser and start serve in demo
$ yarn/npm demo:open

# compile dist demo
$ yarn/npm dist:demo

# compile dist
$ yarn/npm dist

```

## Credits
- [v-autocomplete](https://github.com/paliari/v-autocomplete)

made with &#x2764; by [Steven](https://github.com/iamstevendao).
