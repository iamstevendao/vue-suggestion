<template lang="pug">
div(style="text-align: center;")
  h2 Type some animal name to search

  vue-suggestion(:items="items" v-model='item', :get-label='getLabel', :min-len='0' @update-items='update', :component-item='tpl', @item-selected="itemSelected", @item-clicked="itemClicked", :input-attrs="{name: 'input-test', id: 'v-my-autocomplete'}", :isAutocompleted="false")
  p Selected item:
  pre {{ item }}

  hr
  p.left.note
    b Note:&nbsp;
    | The vue-suggestion component does not contain any css. Therefore, you can customize the appearence for any framework by applying style to the generated classes.
    br
    b
      a(href="https://github.com/paliari/vue-suggestion#what-about-appearence", target="_blank") See an example
</template>

<script>
import Suggestion from '../src/Suggestion.vue'
import tpl from './TplItem.vue'
import Animals from './animals.js'
export default {
  name: 'demo',
  components: { 'vue-suggestion': Suggestion },
  data() {
    return {
      itemsApi: [],
      item: {},
      items: [],
      tpl: tpl
    }
  },
  methods: {
    itemSelected(item) {
      console.log('Selected item!', item)
    },
    itemClicked(item) {
      console.log('You clicked an item!', item)
    },
    getLabel(item) {
      return item.name
    },
    update(text) {
      this.items = Animals.filter((item) => {
        return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
      })
    }
  }
}
</script>

<style src="./style.css"></style>
<style lang="stylus">
.vue-suggestion {
  .vue-suggestion-input-group {
    .vue-suggestion-input {
      font-size: 1.5em;
      padding: 10px 15px;
      box-shadow: none;
      border: 1px solid #157977;
      width: calc(100% - 32px);
      outline: none;
      background-color: #eee;
    }

    &.vue-suggestion-selected {
      .vue-suggestion-input {
        color: green;
        background-color: #f2fff2;
      }
    }
  }

  .vue-suggestion-list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #157977;

    .vue-suggestion-list-item {
      cursor: pointer;
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #157977;
      border-left: 1px solid #157977;
      border-right: 1px solid #157977;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #eee;
      }

      abbr {
        opacity: 0.8;
        font-size: 0.8em;
        display: block;
        font-family: sans-serif;
      }
    }
  }
}

pre {
  text-align: left;
  white-space: pre-wrap;
  background-color: #eee;
  border: 1px solid silver;
  padding: 20px !important;
  border-radius: 10px;
  font-family: monospace !important;
}

.left {
  text-align: left;
}

.note {
  border-left: 5px solid #ccc;
  padding: 10px;
}
</style>
