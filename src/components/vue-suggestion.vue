<template>
  <div :class="[styleClasses, 'vue-suggestion']">
    <div :class="[{ vs__selected: value }, inputOptions.wrapperStyleClasses, 'vs__input-group']">
      <input
        v-model="searchText"
        :type="inputOptions.type"
        :class="[inputOptions.styleClasses, 'vs__input']"
        :placeholder="inputOptions.placeholder"
        :disabled="disabled"
        :maxlength="inputOptions.maxlength"
        @blur="blur"
        @focus="focus"
        @input="inputChange"
        @keydown.enter.prevent="keyEnter"
        @keydown.up.prevent="keyUp"
        @keydown.down.prevent="keyDown"
      />
      <slot name="input-append" />
    </div>
    <slot v-if="loading" name="loading">
      <div class="vs__loading">Loading...</div>
    </slot>
    <slot v-else-if="showList" name="suggestionList">
      <div :class="[suggestionOptions.listStyleClasses, 'vs__list']">
        <div
          v-for="(group, index) in itemGroups"
          :class="suggestionOptions.groupStyleClasses"
          :key="index"
        >
          <div
            v-if="itemGroups.length > 1 || group.header"
            :class="[suggestionOptions.groupHeaderStyleClasses, 'vs__group-header']"
          >
            {{ group.header }}
          </div>
          <div
            v-for="item in group.items"
            :key="item.vsItemIndex"
            :class="[
              { 'vs__item-active': item.vsItemIndex === cursor },
              suggestionOptions.itemWrapperStyleClasses,
              'vs__list-item',
            ]"
            @click="selectItem(item)"
            @mouseover="cursor = item.vsItemIndex"
          >
            <div :class="suggestionOptions.itemStyleClasses" :is="itemTemplate" :item="item" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import utils from '../utils';

function getDefault(key) {
  const value = utils.options[key];
  if (typeof value === 'undefined') {
    return utils.options[key];
  }
  return value;
}

export default {
  name: 'VueSuggestion',
  props: {
    value: {
      type: [Object, String, Number],
      default: null,
    },
    itemTemplate: {
      type: Object,
      default: () => getDefault('itemTemplate'),
    },
    minLen: {
      type: Number,
      default: () => getDefault('minLen'),
    },
    setLabel: {
      type: Function,
      default: () => getDefault('setLabel'),
    },
    items: {
      type: Array,
      default: () => getDefault('items'),
    },
    disabled: {
      type: Boolean,
      default: () => getDefault('disabled'),
    },
    loading: {
      type: Boolean,
      default: () => getDefault('loading'),
    },
    styleClasses: {
      type: [Object, String, Number],
      default: () => getDefault('styleClasses'),
    },
    inputOptions: {
      type: Object,
      default: () => getDefault('inputOptions'),
    },
    suggestionOptions: {
      type: Object,
      default: () => getDefault('suggestionOptions'),
    },
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: 0,
    };
  },
  computed: {
    itemGroups() {
      return this.items.reduce((prv, crr, index) => {
        const groupName = crr.suggestionGroup || '';
        const item = {
          ...crr,
          vsItemIndex: index,
        };
        const foundGroup = prv.find((gr) => gr.header === groupName);
        if (foundGroup) {
          foundGroup.items.push(item);
        } else {
          prv.push({
            header: groupName,
            items: [item],
          });
        }
        return prv;
      }, []);
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
    // eslint-disable-next-line func-names
    'items.length': function () {
      // Items might be changed from Promise after searching
      // So we need the check if we should show the suggestion list
      this.showList = this.isAbleToShowList();
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
      this.$emit('changed', this.searchText);
    },
    isAbleToShowList() {
      return (this.searchText || '').length >= this.minLen && this.items.length > 0;
    },
    checkMissingProps() {
      if (!this.itemTemplate) {
        console.warn('You need to pass `template` as the suggestion list item template');
      }
    },
    focus() {
      this.$emit('focus', this.searchText);
      this.showList = this.isAbleToShowList();
    },
    blur() {
      this.$emit('blur', this.searchText);
      // set timeout for the click event to work
      setTimeout(() => {
        this.showList = false;
      }, 200);
    },
    selectItem({ vsItemIndex, ...item } = {}) {
      if (item) {
        this.searchText = this.setLabel(item);
        this.$emit('selected', item);
      }
      this.$emit('input', item);
    },
    keyUp() {
      this.$emit('key-up', this.searchText);
      if (this.cursor > 0) {
        this.cursor -= 1;
      }
    },
    keyDown() {
      this.$emit('key-down', this.searchText);
      if (this.cursor < this.items.length - 1) {
        this.cursor += 1;
      }
    },
    keyEnter() {
      if (this.showList && this.items[this.cursor]) {
        this.selectItem(this.items[this.cursor]);
        this.showList = false;
      }
      this.$emit('enter', this.items[this.cursor]);
    },
  },
};
</script>

<style>
.vue-suggestion {
  position: relative;
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
