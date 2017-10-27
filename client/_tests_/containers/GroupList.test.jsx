import React from 'react';
import { shallow } from 'enzyme';
import { GroupList } from '../../src/containers/GroupList';

const instance = () => {
  const props = {
    userGroupList: [],
    match: {
      params: { groupId: 1 }
    },
    getGroupMessages: jest.fn(() => Promise.resolve()),

  };
  return shallow(<GroupList {...props} />);
};

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
    const props = {
      userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }], [{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
      match: {
        params: { groupId: 1 }
      }
    };
    const nextProps = props;
    wrapper.setState({
      groups: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }], [{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    const props = {
      userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
      match: {
        params: { groupId: 1 }
      }
    };
    const nextProps = props;
    wrapper.setState({
      groups: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(2);
  });
});
