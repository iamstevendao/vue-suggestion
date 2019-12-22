import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    name: 'vue-suggestion',
    file: 'dist/vue-suggestion.esm.js',
    format: 'es',
  },
});

export default config;
