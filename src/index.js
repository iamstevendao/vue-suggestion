import utils, { defaultOptions } from './utils';
import VueSuggestion from './components/vue-suggestion.vue';

export function install(app, customOptions = {}) {
  if (install.installed) return;
  install.installed = true;

  const {
    suggestionOptions: customSuggestionOptions,
    inputOptions: customInputOptions,
    ...otherCustomOptions
  } = customOptions;
  const {
    suggestionOptions: defaultSuggestionOptions,
    inputOptions: defaultInputOptions,
    ...otherDefaultOptions
  } = defaultOptions;

  utils.options = {
    inputOptions: {
      ...defaultInputOptions,
      ...customInputOptions,
    },
    suggestionOptions: {
      ...defaultSuggestionOptions,
      ...customSuggestionOptions,
    },
    ...otherDefaultOptions,
    ...otherCustomOptions,
  };

  app.component('vue-suggestion', VueSuggestion);
}

export { VueSuggestion };

const plugin = {
  install,
};

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
