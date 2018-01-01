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
            @keyup.enter="keyEnter" 
            @keydown.tab="keyEnter" 
            @keydown.up="keyUp" 
            @keydown.down="keyDown">
    </div>
    <div class="vue-suggestion-list" v-if="showList">
      <div class="vue-suggestion-list-item" v-for="item, i in items" @click="onClickItem(item)"
           :class="{'vue-suggestion-item-active': i === cursor}" @mouseover="cursor = i">
        <div :is="componentItem" :item="item" :searchText="searchText"></div>
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
    autoSelectOneItem: { type: Boolean, default: true },
    placeholder: String,
    inputClass: { type: String, default: 'vue-suggestion-input' },
    disabled: { type: Boolean, default: false },
    inputAttrs: { type: Object, default: () => { return {} } },
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: -1,
    }
  },
  methods: {
    inputChange() {
      this.showList = this.isAbleToShowList();
      this.cursor = -1
      // this.onSelectItem(null, 'inputChange')
      // utils.callUpdateItems(this.searchText, this.updateItems)
      this.updateItems();
      this.$emit('change', this.searchText)
    },

    updateItems() {
      this.$emit('update-items', this.searchText)
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
      this.$emit('blur', this.searchText)
      setTimeout(() => this.showList = false, 200)
    },

    onClickItem(item) {
      this.onSelectItem(item)
      this.$emit('item-clicked', item)
    },

    onSelectItem(item) {
      if (item) {
        // this.internalItems = [item]
        this.searchText = this.setLabel(item)
        this.$emit('item-selected', item)
      } else {
        // this.setItems(this.items)
      }
      this.$emit('input', item)
    },

    isSelecteValue(value) {
      return 1 == this.items.length && value == this.items[0]
    },

    keyUp() {
      if (this.cursor > -1) {
        this.cursor--
        this.itemView(this.$el.getElementsByClassName('vue-suggestion-list-item')[this.cursor])
      }
    },

    keyDown() {
      if (this.cursor < this.items.length) {
        this.cursor++
        this.itemView(this.$el.getElementsByClassName('vue-suggestion-list-item')[this.cursor])
      }
    },

    itemView(item) {
      if (item && item.scrollIntoView) {
        item.scrollIntoView(false)
      }
    },

    keyEnter() {
      const index = this.cursor < 0 ? 0 : this.cursor;
      if (this.showList && this.items[index]) {
        this.onSelectItem(this.items[index])
        this.showList = false
      }
    },

  },

  watch: {
    value(newValue) {
      if (!this.isSelecteValue(newValue)) {
        this.onSelectItem(newValue)
        this.searchText = this.setLabel(newValue)
      }
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
