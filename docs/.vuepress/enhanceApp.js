// enhanceApp.js

import VueSuggestion from '../../src/index.js';

export default ({ Vue, options }) => {
  Vue.use(VueSuggestion);
  Vue.config.productionTip = false;
}
