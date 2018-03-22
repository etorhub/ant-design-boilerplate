import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import SearchBar from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  const testProps = {
    searchText: 'test',
    onChangeSearchText: jest.fn(),
  };
  it('should be mounted with no props', () => {
    const wrapper = renderer.create(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should manage typing with only searchText ', () => {
    const wrapper = shallow(<SearchBar searchText="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with all props', () => {
    const wrapper = renderer.create(<SearchBar {...testProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch action and react to typing ', () => {
    const wrapper = mount(<SearchBar onChangeSearchText={testProps.onChangeSearchText} />);
    const expected = '111';
    wrapper.find('.ant-input').simulate('change', { target: { value: expected } });
    expect(testProps.onChangeSearchText).toHaveBeenCalledTimes(1);
  });

  it('should delete text when button clear clicked ', () => {
    const wrapper = mount(<SearchBar {...testProps} />);
    wrapper.find('#search-text-delete').at(0).simulate('click');
    expect(testProps.onChangeSearchText).toHaveBeenCalledTimes(2);
  });
});

