import { terser } from 'rollup-plugin-terser';
import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'VueSuggestion',
    file: 'dist/vue-suggestion.min.js',
    format: 'iife',
  },
});

config.plugins.push(terser());

export default config;
