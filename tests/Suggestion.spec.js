import { shallow } from '@vue/test-utils'
import animals from '/demo/animals';
import Suggestion from '/src/Suggestion.vue'

describe('Suggestion.vue', () => {
  it('generates data properly when passing minimum data', () => {
    const items = ['']
    const wrapper = shallow(Suggestion, {
      propsData: {
        items,
        itemTemplate: '<span>Hello</span>',
      }
    })
    expect(wrapper.vm.searchText).toBe('');
    expect(wrapper.vm.isShowList).toBeFalsy();
    expect(wrapper.vm.cursor).toBe(0);
  });
  it('shows the suggestion list when value is inputted and there are items passed', () => {
    const items = [];
    function setLabel(item) {
      return item.name;
    }
    const wrapper = shallow(Suggestion, {
      propsData: {
        items: animals,
        setLabel,
        itemTemplate: '<span>Hello</span>',
        value: 'abcd',
      }
    });
    expect(wrapper.vm.isAbleToShowList).toBeTruthy();
  })
})
