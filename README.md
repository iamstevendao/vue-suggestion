<p align="center">
<img width="100" alt="vue-suggestion-logo" src="https://iamstevendao.github.io/vue-suggestion/hero.png"/>
</p>

# vue-suggestion

Suggestion list input for Vue

[![npm](https://img.shields.io/npm/dt/vue-suggestion.svg)](https://www.npmjs.com/package/vue-suggestion) [![stars](https://img.shields.io/github/stars/iamstevendao/vue-suggestion.svg)](https://github.com/iamstevendao/vue-suggestion)

<p align="center">
<img width="600px" alt="In-action GIF" src="https://thumbs.gfycat.com/ThirstyFearlessBunting-size_restricted.gif"/>
</p>

## Documentation and Demo

[Visit the website](https://iamstevendao.github.io/vue-suggestion/)

## Changelog

[Go to Github Releases](https://github.com/iamstevendao/vue-suggestion/releases)

## Getting started

- Install the plugin:

  ```
  npm install vue-suggestion
  ```

- Add the plugin into your app:

  ```javascript
  import Vue from 'vue';
  import VueSuggestion from 'vue-suggestion';

  Vue.use(VueSuggestion);
  ```

  [More info on installation](#installation)

- Use the `vue-suggestion` component:

  ```html
  <template>
    <vue-suggestion
      :items="items"
      v-model="item"
      :setLabel="setLabel"
      :itemTemplate="itemTemplate"
      @changed="inputChange"
      @selected="itemSelected"
    >
    </vue-suggestion>
  </template>

  <script>
    import itemTemplate from './item-template.vue';
    export default {
      data() {
        return {
          item: {},
          items: [
            { id: 1, name: 'Golden Retriever' },
            { id: 2, name: 'Cat' },
            { id: 3, name: 'Squirrel' },
          ],
          itemTemplate,
        };
      },
      methods: {
        itemSelected(item) {
          this.item = item;
        },
        setLabel(item) {
          return item.name;
        },
        inputChange(text) {
          // your search method
          this.items = this.items.filter((item) => item.name.indexOf(text) > -1);
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
      <b>#{{ item.id }}</b>
      <span>{{ item.name }}</span>
    </div>
  </template>

  <script>
    export default {
      props: {
        item: { required: true },
      },
    };
  </script>
  ```

## Installation

### npm

```bash
  npm install vue-suggestion
```

Install the plugin into Vue:

```javascript
import Vue from 'vue';
import VueSuggestion from 'vue-suggestion';

Vue.use(VueSuggestion, [(globalOptions = {})]); // Define default global options here (optional)
```

> View all available options in [Props](#props).

Or use the component directly:

```html
<!-- your-component.vue-->
<template>
  <vue-suggestion v-model="value"></vue-suggestion>
</template>

<!-- some-sample-css-as-example-for-your-dropdown-autocomplete  -->
<style scope>
  .vue-suggestion .vs__list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #023d7b;
    position: relative;
  }
  .vue-suggestion .vs__list .vs__list-item {
    background-color: #fff;
    padding: 10px;
    border-left: 1px solid #023d7b;
    border-right: 1px solid #023d7b;
  }
  .vue-suggestion .vs__list .vs__list-item:last-child {
    border-bottom: none;
  }
  .vue-suggestion .vs__list .vs__list-item:hover {
    background-color: #eee !important;
  }
  .vue-suggestion .vs__list,
  .vue-suggestion .vs__loading {
    position: absolute;
  }
  .vue-suggestion .vs__list .vs__list-item {
    cursor: pointer;
  }
  .vue-suggestion .vs__list .vs__list-item.vs__item-active {
    background-color: #f3f6fa;
  }
</style>

<script>
  import { VueSuggestion } from 'vue-suggestion';

  export default {
    components: {
      VueSuggestion,
    },
  };
</script>
```

### Browser

Include [vue-suggestion](/dist/vue-suggestion.min.js) in the page.

```html
<script src="https://unpkg.com/vue-suggestion"></script>
```

**If Vue is detected in the Page, the plugin is installed automatically.**

Manually install the plugin into Vue:

```javascript
Vue.use(VueSuggestion);
```

Or use the component directly:

```javascript
Vue.component('vue-suggestion', VueSuggestion.VueSuggestion);
```

## License

Copyright (c) 2018 Steven Dao.
Released under the [MIT License](https://github.com/iamstevendao/vue-suggestion/blob/master/LICENSE).

made with &#x2764; by [Steven](https://github.com/iamstevendao).
