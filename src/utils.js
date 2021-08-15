export const allProps = [
  {
    name: 'itemTemplate',
    type: 'Vue component',
    default: null,
    description: 'Template for item in suggestion list',
    inDemo: false,
  },
  {
    name: 'items',
    type: Array,
    default: [],
    description: 'Suggestion array, should be updated dynamically after `onInputChange()`',
    inDemo: false,
  },
  {
    name: 'setLabel',
    type: Function,
    default: (item) => item,
    description: 'Value of chosen input, be shown in the input`',
    inDemo: false,
  },
  {
    name: 'loading',
    type: Boolean,
    default: false,
    description: '!!',
    inDemo: false,
  },
  {
    name: 'minLen',
    type: Number,
    default: 2,
    description: 'Minimum number of characters inputted to start searching',
    inDemo: false,
  },
  {
    name: 'styleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the wrapper',
    inDemo: false,
  },
  {
    name: 'inputOptions.maxlength',
    type: Number,
    default: 100,
    description: 'Native input `maxlength` attribute',
    inDemo: false,
  },
  {
    name: 'inputOptions.type',
    type: String,
    default: 'search',
    description: 'Native input `type` attribute',
    inDemo: false,
  },
  {
    name: 'inputOptions.placeholder',
    type: String,
    default: '',
    description: 'Placeholder of the input',
    inDemo: false,
  },
  {
    name: 'inputOptions.styleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'inputOptions.wrapperStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.listStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.groupStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.groupHeaderStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.groupHeaderStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.groupHeaderStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.itemWrapperStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'suggestionOptions.itemStyleClasses',
    type: [String, Array, Object],
    default: '',
    description: 'Custom classes for the input',
    inDemo: false,
  },
  {
    name: 'disabled',
    type: Boolean,
    default: false,
    description: 'Disable the input',
    inDemo: false,
  },
];

export const defaultOptions = [...allProps]
  .reduce((prv, crr) => {
    if (crr.name.includes('.')) {
      const [key, nestedKey] = crr.name.split('.');
      if (prv[key]) {
        Object.assign(prv[key], { [nestedKey]: crr.default });
      } else {
        Object.assign(prv, { [key]: { [nestedKey]: crr.default } });
      }
    } else {
      Object.assign(prv, { [crr.name]: crr.default });
    }
    return prv;
  }, {});

export default {
  options: { ...defaultOptions },
};
