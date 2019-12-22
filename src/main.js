/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import App from './App.vue';
import VueSuggestion from './components/vue-suggestion.vue';

Vue.config.productionTip = false;

Vue.component('vue-suggestion', VueSuggestion);

new Vue({
  render: h => h(App),
}).$mount('#app');
