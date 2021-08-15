# Installation

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
