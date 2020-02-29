
export const defaultOptions = {
  itemTemplate: null,
  minLen: 2,
  maxLen: 20,
  value: null,
  setLabel: item => item,
  items: () => [],
  placeholder: '',
  inputClasses: '',
  wrapperClasses: '',
  inputWrapperClasses: '',
  suggestionListClasses: '',
  suggestionGroupClasses: '',
  suggestionGroupHeaderClasses: '',
  suggestionItemWrapperClasses: '',
  suggestionItemClasses: '',
};

export default {
  options: { ...defaultOptions },
};
