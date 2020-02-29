<template>
  <div :class="[wrapperClasses, 'vue-suggestion']">
    <div :class="[{ vs__selected: value }, inputWrapperClasses, 'vs__input-group']">
      <input
        v-model="searchText"
        type="search"
        :class="[inputClasses, 'vs__input']"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLen"
        @blur="blur"
        @focus="focus"
        @input="inputChange"
        @keydown.enter.prevent="keyEnter"
        @keydown.up.prevent="keyUp"
        @keydown.down.prevent="keyDown"
      />
      <slot name="searchSlot" />
    </div>
    <slot v-if="loading" name="loading">
      <div class="vs__loading">Loading...</div>
    </slot>
    <slot v-else-if="showList" name="suggestionList">
      <div :class="[suggestionListClasses, 'vs__list']">
        <div v-for="(group, index) in itemGroups" :class="suggestionGroupClasses" :key="index">
          <div
            v-if="itemGroups.length > 1 || group.header"
            :class="[suggestionGroupHeaderClasses, 'vs__group-header']"
          >
            {{ group.header }}
          </div>
          <div
            v-for="item in group.items"
            :key="item.vsItemIndex"
            :class="[
              { 'vs__item-active': item.vsItemIndex === cursor },
              suggestionItemWrapperClasses,
              'vs__list-item',
            ]"
            @click="selectItem(item)"
            @mouseover="cursor = item.vsItemIndex"
          >
            <div :class="suggestionItemClasses" :is="itemTemplate" :item="item" />
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
    itemTemplate: {
      type: Object,
      default: () => getDefault('itemTemplate'),
    },
    minLen: {
      type: Number,
      default: () => getDefault('minLen'),
    },
    maxLen: {
      type: Number,
      default: () => getDefault('maxLen'),
    },
    value: {
      type: [Object, String, Number],
      default: () => getDefault('value'),
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
    placeholder: {
      type: String,
      default: () => getDefault('placeholder'),
    },
    inputClasses: {
      type: String,
      default: () => getDefault('inputClasses'),
    },
    wrapperClasses: {
      type: String,
      default: () => getDefault('wrapperClasses'),
    },
    inputWrapperClasses: {
      type: String,
      default: () => getDefault('inputWrapperClasses'),
    },
    suggestionListClasses: {
      type: String,
      default: () => getDefault('suggestionListClasses'),
    },
    suggestionGroupClasses: {
      type: String,
      default: () => getDefault('suggestionGroupClasses'),
    },
    suggestionGroupHeaderClasses: {
      type: String,
      default: () => getDefault('suggestionGroupHeaderClasses'),
    },
    suggestionItemWrapperClasses: {
      type: String,
      default: () => getDefault('suggestionItemWrapperClasses'),
    },
    suggestionItemClasses: {
      type: String,
      default: () => getDefault('suggestionItemClasses'),
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
        const foundGroup = prv.find(gr => gr.header === groupName);
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
