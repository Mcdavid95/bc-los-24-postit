import React from 'react';
import { shallow } from 'enzyme';
import { MessageBoard } from '../../src/containers/MessageBoard';
import { props, nextProps } from '../_mocks_/components.mock';


const instance = () => shallow(<MessageBoard {...props} />);
const wrapper = instance();
describe('Message Board component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      messages: nextProps.props.groupMessages
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps.props);
    expect(onSubmitSpy).toHaveBeenCalledTimes(2);
  });
});
