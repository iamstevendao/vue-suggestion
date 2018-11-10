<template lang="html">
  <div class="vue-suggestion">
    <div class="vue-suggestion-input-group" 
        :class="{'vue-suggestion-selected': value}">
      <input type="search" 
            v-model="searchText" 
            class="vue-suggestion-input"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="blur" 
            @focus="focus" 
            @input="inputChange"
            @keydown.enter.prevent="keyEnter" 
            @keydown.up.prevent="keyUp" 
            @keydown.down.prevent="keyDown">
      <slot name="searchSlot"></slot>
    </div>
    <div class="vue-suggestion-list" 
        v-if="showList">
      <div class="vue-suggestion-list-item" 
          v-for="item, i in items" 
          @click="selectItem(item)" 
          :class="{'vue-suggestion-item-active': i === cursor}" 
          @mouseover="cursor = i">
        <div :is="itemTemplate" 
            :item="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-suggestion',
  props: {
    itemTemplate: {},
    minLen: { type: Number, default: 2 },
    value: null,
    setLabel: { type: Function, default: item => item },
    items: { type: Array, default: [] },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
  },
  created() {
    this.checkMissingProps();
  },
  mounted() {
    if (this.value) {
      this.searchText = this.setLabel(this.value);
    }
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: 0,
    };
  },
  methods: {
    inputChange() {
      this.showList = this.isAbleToShowList();
      this.cursor = 0;
      this.$emit('onInputChange', this.searchText);
    },

    isAbleToShowList() {
      return this.searchText &&
        this.searchText.length >= this.minLen &&
        this.items &&
        this.items.length > 0;
    },

    checkMissingProps() {
      if (!this.itemTemplate) {
        console.warn('You need to pass `template` as the suggestion list item template');
      }
    },

    focus() {
      this.showList = this.isAbleToShowList();
    },

    blur() {
      // set timeout for the click event to work
      setTimeout(() => { this.showList = false; }, 200);
    },

    selectItem(item) {
      if (item) {
        this.searchText = this.setLabel(item);
        this.$emit('onItemSelected', item);
      }
      this.$emit('input', item);
    },

    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1;
      }
    },

    keyDown() {
      if (this.cursor < this.items.length - 1) {
        this.cursor += 1;
      }
    },

    keyEnter() {
      if (this.showList && this.items[this.cursor]) {
        this.selectItem(this.items[this.cursor]);
        this.showList = false;
      }
      this.$emit('onEnter', this.items[this.cursor]);
    },

  },

  watch: {
    value: {
      handler(value) {
        if (!value) {
          return;
        }
        this.searchText = this.setLabel(value);
      },
      deep: true,
    },
  },
};
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
