import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-suggestion',
    file: 'dist/vue-suggestion.umd.js',
    format: 'umd',
  },
});

export default config;
