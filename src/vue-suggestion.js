import Suggestion from './Suggestion.vue';
// Suggestion.version = process.env.VERSION

export default {
  ...Suggestion,
  install: vue => vue.component(Suggestion.name, Suggestion),
};
