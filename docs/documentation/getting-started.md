# Getting Started

- Install the plugin:

  ```sh
  npm install vue-suggestion
  ```

- Add the plugin into your app:

  ```javascript
  import Vue from 'vue';
  import VueSuggestion from 'vue-suggestion';

  Vue.use(VueSuggestion);
  ```

  [More info on installation](/vue-suggestion/documentation/installation)

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
