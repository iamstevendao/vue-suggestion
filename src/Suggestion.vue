<template lang="html">
  <div class="vue-suggestion">
    <div
      :class="{'vue-suggestion-selected': value}"
      class="vue-suggestion-input-group">
      <input
        v-model="searchText"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="disabled"
        type="search"
        class="vue-suggestion-input"
        @blur="blur"
        @focus="focus"
        @input="inputChange"
        @keydown.enter.prevent="keyEnter"
        @keydown.up.prevent="keyUp"
        @keydown.down.prevent="keyDown">
      <slot name="searchSlot"/>
    </div>
    <div
      v-if="showList"
      class="vue-suggestion-list">
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="{'vue-suggestion-item-active': i === cursor}"
        class="vue-suggestion-list-item"
        @click="selectItem(item)"
        @mouseover="cursor = i">
        <div
          :is="itemTemplate"
          :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueSuggestion',
  props: {
    itemTemplate: {
      type: Object,
      required: true,
    },
    minLen: { type: Number, default: 2 },
    value: {
      type: [Object, String, Number],
      default: null,
    },
    setLabel: { type: Function, default: item => item },
    items: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    inputClasses: { type: String, default: '' },
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: 0,
    };
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
  created() {
    this.checkMissingProps();
  },
  mounted() {
    if (this.value) {
      this.searchText = this.setLabel(this.value);
    }
  },
  methods: {
    inputChange() {
      this.showList = this.isAbleToShowList();
      this.cursor = 0;
      this.$emit('onInputChange', this.searchText);
    },

    isAbleToShowList() {
      return (
        this.searchText
        && this.searchText.length >= this.minLen
        && this.items
        && this.items.length > 0
      );
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
      setTimeout(() => {
        this.showList = false;
      }, 200);
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
