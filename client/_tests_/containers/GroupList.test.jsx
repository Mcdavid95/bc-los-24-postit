import React from 'react';
import { shallow } from 'enzyme';
import { GroupList } from '../../src/containers/GroupList';
import { props, nextProps } from '../_mocks_/components.mock';

const instance = () => shallow(<GroupList {...props} />);

const wrapper = instance();

describe('Group List component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('ul');
  });
  it('should contain the method onClick', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      groups: nextProps.userGroupList
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      groups: nextProps.props.userGroupList
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps.props);
    expect(onSubmitSpy).toHaveBeenCalledTimes(2);
  });
});
