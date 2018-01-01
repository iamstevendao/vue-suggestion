<template lang="html">
  <div class="vue-suggestion">
    <div class="vue-suggestion-input-group" :class="{'vue-suggestion-selected': value}">
      <input type="search" 
            v-model="searchText" 
            v-bind="inputAttrs" 
            :class="inputAttrs.class || inputClass"
            :placeholder="inputAttrs.placeholder || placeholder"
            :disabled="inputAttrs.disabled || disabled"
            @blur="blur" 
            @focus="focus" 
            @input="inputChange"
            @keyup.enter.prevent="keyEnter" 
            @keydown.up.prevent="keyUp" 
            @keydown.down.prevent="keyDown">
    </div>
    <div class="vue-suggestion-list" 
        v-if="showList">
      <div class="vue-suggestion-list-item" 
          v-for="item, i in items" 
          @click="onSelectItem(item)"
          :class="{'vue-suggestion-item-active': i === cursor}" 
          @mouseover="cursor = i">
        <div :is="componentItem" 
            :item="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'vue-sugesstion',
  props: {
    componentItem: { default: () => Item },
    minLen: { type: Number, default: 2 },
    wait: { type: Number, default: 0 },
    value: null,
    setLabel: {
      type: Function,
      default: item => item
    },
    items: { type: Array, default: [] },
    placeholder: String,
    inputClass: { type: String, default: 'vue-suggestion-input' },
    disabled: { type: Boolean, default: false },
    inputAttrs: { type: Object, default: () => { return {} } },
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: 0,
    }
  },
  methods: {
    inputChange() {
      this.showList = this.isAbleToShowList();
      this.cursor = 0
      this.$emit('onInputChange', this.searchText)
    },

    isAbleToShowList() {
      return this.searchText &&
        this.searchText.length >= this.minLen &&
        this.items &&
        this.items.length > 0;
    },

    focus() {
      this.showList = this.isAbleToShowList();
    },

    blur() {
      this.showList = false;
    },

    onSelectItem(item) {
      if (item) {
        this.searchText = this.setLabel(item)
        this.$emit('onSelected', item)
      }
      this.$emit('input', item);
    },

    keyUp() {
      if (this.cursor > 0) {
        this.cursor--;
      }
    },

    keyDown(e) {
      if (this.cursor < this.items.length - 1) {
        this.cursor++;
      }
    },

    keyEnter() {
      if (this.showList && this.items[this.cursor]) {
        this.onSelectItem(this.items[this.cursor]);
        this.showList = false;
      }
    },

  },

  watch: {
    value(newValue) {
      this.searchText = this.setLabel(newValue)
    }
  }
}
</script>

<style>
.vue-suggestion {
  position: relative;
}
.vue-suggestion .vue-suggestion-list {
  position: absolute;
}
.vue-suggestion .vue-suggestion-list .vue-suggestion-list-item {
  cursor: pointer;
}
.vue-suggestion
  .vue-suggestion-list
  .vue-suggestion-list-item.vue-suggestion-item-active {
  background-color: #f3f6fa;
}
</style>
