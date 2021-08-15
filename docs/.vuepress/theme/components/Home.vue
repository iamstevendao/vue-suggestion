<template>
  <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : null">
    <header class="hero">
      <img :src="$withBase('hero.png')" alt="vue-suggestion" />
      <h1>Suggestion Input with Vue</h1>
      <div style="margin-bottom: 10px">
        <a href="https://www.npmjs.com/package/vue-suggestion"
          ><img src="https://img.shields.io/npm/dt/vue-suggestion.svg" /></a
        >&nbsp;
        <a href="https://github.com/iamstevendao/vue-suggestion"
          ><img src="https://img.shields.io/github/stars/iamstevendao/vue-suggestion.svg"
        /></a>
      </div>
      <span style="color: #999999; font-size: 1.5rem">
        made with &#x2764; by
        <a style="color: inherit" href="https://github.com/iamstevendao">Steven</a>.
      </span>

      <div style="width: 1000px; margin: 20px auto">
        <vue-suggestion
          v-model="item"
          :items="items"
          :setLabel="setLabel"
          :itemTemplate="itemTemplate"
          maxLen="20"
          @changed="inputChange"
        ></vue-suggestion>
      </div>
      <template v-if="item && item.id">
        <p>Selected item:</p>
        <code>{{ item }}</code>
      </template>
    </header>
  </main>
</template>

<script>
import itemTemplate from './item-template.vue';
import animals from './animals';
import FormInput from './FormInput.vue';
import { allProps, defaultOptions } from '../../../../src/utils';

function getFormConfig(field) {
  if (field.type.name === 'Boolean') {
    return { type: 'checkbox' };
  }
  if (field.type.name === 'String') {
    if (field.options?.length) {
      return { type: 'radio', bind: { items: field.options } };
    }
    return { type: 'input' };
  }
}

export default {
  name: 'Home',
  components: { FormInput },
  data() {
    return {
      itemsApi: [],
      item: {},
      items: [],
      itemTemplate,
      isLoading: true,
      options: {
        ...defaultOptions,
      },
      fields: allProps
        .filter(({ inDemo }) => inDemo)
        .map((prop) => ({
          model: prop.name,
          label: prop.name,
          description: prop.description,
          ...getFormConfig(prop),
        })),
    };
  },
  methods: {
    setLabel(item) {
      return item.name;
    },
    inputChange(text) {
      this.items = animals
        .filter((item) => (new RegExp(text.toLowerCase())).test(item.name.toLowerCase()));
    },
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

.home {
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 0px auto;
  display: block;
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .options {
    display: flex;
    margin-top: 20px;

    .form {
      flex: 3;
    }

    .results {
      flex: 1;
      background-color: whitesmoke;
      padding: 20px;
    }
  }

  .hero {
    text-align: center;

    > img {
      max-width: 100%;
      max-height: 100px;
      display: block;
      margin: 1.5rem auto;
    }

    a {
      text-decoration: underline;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      .description {
        font-size: 1.2rem;
      }

      > img {
        max-height: 80px;
        margin: 1.2rem auto;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
  }
}

.vue-suggestion {
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
}

.vue-suggestion .vs__input-group .vs__input {
  width: 100%;
  display: block;
  margin: 0 auto;
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

.vue-suggestion .vs__input-group .vs__input:focus {
  border: 1px solid #023d7b;
}

.vue-suggestion .vs__list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #023d7b;
}

.vue-suggestion .vs__list .vs__list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-left: 10px solid #023d7b;
  border-right: 1px solid #023d7b;
}

.vue-suggestion .vs__list .vs__list-item:last-child {
  border-bottom: none;
}

.vue-suggestion .vs__list .vs__list-item:hover {
  background-color: #eee !important;
}
</style>
