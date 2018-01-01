<template lang="pug">
div(style="text-align: center;")
  p
    b(style="font-size: 25px;") Vue Suggestion 
    span(style="font-size: 13px;") [
      a(href="https://github.com/iamstevendao/vue-suggestion") github
      | ]
  span(style="color: grey;") made with &#x2764; by Steven.
  p: span Press enter to select the first item in the suggestion list

  vue-suggestion(:items="items" 
                v-model='item', 
                :setLabel='setLabel',
                :template='tpl', 
                @onInputChange='update', 
                @onItemSelected="itemSelected")

  p Selected item:
  code {{ item }}

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
    setLabel(item) {
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

<style>
.vue-suggestion .vue-suggestion-input-group .vue-suggestion-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  line-height: 1.25;
  color: #464a4c;
  outline: none;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.vue-suggestion .vue-suggestion-input-group .vue-suggestion-input:focus {
  border: 1px solid #023d7b;
}

.vue-suggestion .vue-suggestion-list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #023d7b;
}

.vue-suggestion .vue-suggestion-list .vue-suggestion-list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-left: 10px solid #023d7b;
  border-right: 1px solid #023d7b;
}

.vue-suggestion .vue-suggestion-list .vue-suggestion-list-item:last-child {
  border-bottom: none;
}

.vue-suggestion .vue-suggestion-list .vue-suggestion-list-item:hover {
  background-color: #eee;
}
</style>
