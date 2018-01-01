import Suggestion from './Suggestion.vue'
// Suggestion.version = proccess.env.VERSION

export default {
  ...Suggestion,
  install: vue => vue.component(Suggestion.name, Suggestion)
}
