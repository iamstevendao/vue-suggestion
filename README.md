# vue-suggestion

Suggestion list input for Vue.js

<p align="center">
<img width="600px" alt="In-action GIF" src="https://thumbs.gfycat.com/ThirstyFearlessBunting-size_restricted.gif"/>
</p>

**Useful Links**

- [Live Demo](https://iamstevendao.github.io/vue-suggestion/)
- [Changelog](https://github.com/EducationLink/vue-suggestion/releases)
- [Documentation for `v0.x.x`](https://github.com/EducationLink/vue-suggestion/blob/master/README-v0.md)

**Table of Contents**

- [Getting started](#getting-started)
- [Installation](#installation)
  - [npm](#npm)
  - [Browser](#browser)
- [Usage](#usage)
  - [Props](#props)
  - [Events](#events)
  - [Slots](#slots)
- [Credits](#credits)

## Getting started
- Install the plugin:

  ```
  npm install vue-suggestion
  ```

- Add the plugin into your app:

  ```javascript
  import Vue from 'vue'
  import VueSuggestion from 'vue-suggestion'

  Vue.use(VueSuggestion)
  ```

  [More info on installation](#installation)

- Use the `vue-suggestion` component:

  ```html
  <template>
    <vue-suggestion :items="items" 
                    v-model="item", 
                    :setLabel="setLabel",
                    :itemTemplate="itemTemplate", 
                    @changed="inputChange", 
                    @selected="itemSelected">
    </vue-suggestion>
  </template>

  <script>
  import itemTemplate from './item-template.vue';
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
      itemSelected (item) {
        this.item = item;
      },
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
      <b>#{{ item.id }}</b>
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

## Installation
### npm
```bash
  npm install vue-suggestion
```

Install the plugin into Vue:

```javascript
import Vue from 'vue'
import VueSuggestion from 'vue-suggestion'

Vue.use(VueSuggestion, [globalOptions = {}]) // Define default global options here (optional)
```
> View all available options in [Props](#props).

Or use the component directly:

```html
<!-- your-component.vue-->
<template>
  <vue-suggestion v-model="value"></vue-suggestion>
</template>
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
Vue.use(VueSuggestion)
```

Or use the component directly:

```javascript
Vue.component('vue-suggestion', VueSuggestion.VueSuggestion)
```

## Usage

### Props

  | Property | Type | Default value | Description |
  | -------------- | ---- | ------------- | ----------- |
  | `itemTemplate` | Vue component |  | Template for item in suggestion list |
  | `setLabel` | `function` |  | Value of chosen input, be shown in the input |
  | `items` | `Array` | `[]` | Suggestion array, should be updated dynamically after `onInputChange()` |
  | `minLen` | `Number` | `2` | Minimum number of characters inputted to start searching |
  | `disabled` | `Boolean` | `false` | Disable the input |
  | `placeholder` | `String` | `''` | Placeholder of the input |

### Events

  | Event | Arguments | Description |
  | -------------- | --------- | ----------- |
  | `changed` | `String` | Fires when the input changes with the argument is the current input text. |
  | `selected` | `Object` | Fires when user selects a suggestion |
  | `enter` | `Object` | Native enter/return key press event |
  | `key-up` | `Object` | Native key up event |
  | `key-down` | `Object` | Native key down event |
  | `focus` | `Object` | Native focus event |
  | `blur` | `Object` | Native blur event |

### Slots

  | Slot | Description |
  | ---- | ----------- |
  | `searchSlot` | Next to the input, for the custom search icon or button... |

## Credits
- [v-autocomplete](https://github.com/paliari/v-autocomplete)

made with &#x2764; by [Steven](https://github.com/iamstevendao).
