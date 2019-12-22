import { shallow } from '@vue/test-utils';
import animals from '/demo/animals';
import itemTemplate from '/demo/item-template.vue';
import Suggestion from '/src/Suggestion.vue';

describe('Suggestion.vue', () => {
  it('generates data properly when passing minimum data', () => {
    const items = [''];
    const wrapper = shallow(Suggestion, {
      propsData: {
        items,
        itemTemplate: '<span>Hello</span>',
      },
    });
    expect(wrapper.vm.searchText).toBe('');
    expect(wrapper.vm.isShowList).toBeFalsy();
    expect(wrapper.vm.cursor).toBe(0);
  });
  it('shows the suggestion list when value is inputted and there are items passed', () => {
    const wrapper = shallow(Suggestion, {
      propsData: {
        items: animals,
        itemTemplate,
        value: 'abcd',
      },
    });
    expect(wrapper.vm.isAbleToShowList).toBeTruthy();
  });
  it('shows and hides the suggestions when input text and press enter', () => {
    const wrapper = shallow(Suggestion, {
      propsData: {
        items: animals,
        itemTemplate: '<div>hello</div>',
        value: 'abcd',
      },
    });

    const input = wrapper.find('.vue-suggestion-input');
    expect(input.is('input')).toBe(true);

    input.element.value = 'abcde';
    input.trigger('input');
    expect(wrapper.vm.searchText).toBe('abcde');

    // input.trigger('keydown.enter');
    // // expect(wrapper.vm.searchText).toBe(animals[0]);
    // expect(wrapper.vm.showList).toBe(false);
  });
});
