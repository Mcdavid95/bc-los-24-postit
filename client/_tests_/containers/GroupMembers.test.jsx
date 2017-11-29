import React from 'react';
import { mount, shallow } from 'enzyme';
import { GroupMembers } from '../../src/containers/GroupMembers';
import { props, nextProps } from '../_mocks_/components.mock';

const shallowComponent = () => shallow(<GroupMembers {...props} />);
const instance = () => mount(<GroupMembers {...props} />);
const wrapper = instance();
describe('Message Board component test', () => {
  it('should render without crashing', () => {
    const component = shallowComponent();
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      members: nextProps.memberList
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      members: nextProps.props.memberList
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps.props);
    expect(onSubmitSpy).toHaveBeenCalledTimes(2);
  });
});
