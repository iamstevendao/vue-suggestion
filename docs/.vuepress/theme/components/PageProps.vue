<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <Content />
      <template v-for="prop in allProps">
        <h3>{{ prop.name }}</h3>
        <ul>
          <li>Type: <span v-html="getType(prop.type)"></span></li>
          <li>
            Default:
            <code v-if="typeof prop.default !== 'undefined'">{{ getDefault(prop) }}</code>
          </li>
        </ul>
        <p v-html="prop.description"></p>
      </template>
    </div>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';
import { allProps, defaultOptions } from '../../../../src/utils';

export default {
  name: 'PageProps',
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  data() {
    return {
      allProps,
    };
  },
  methods: {
    getType(type) {
      if (typeof type === 'string') {
        return `<code>${type}</code>`;
      }
      if (type.length === 1) {
        return `<code>${type.name}</code>`;
      }
      return type.map((t) => `<code>${t.name}</code>`).join(', ');
    },
    getDefault(prop) {
      switch (typeof prop.default) {
        case 'number':
          return prop.default;
        case 'boolean':
          return prop.default.toString();
        case 'string':
          return `'${prop.default}'`;
        case 'object':
          return JSON.stringify(prop.default);
        default:
          return prop.default;
      }

    }
  }
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>
