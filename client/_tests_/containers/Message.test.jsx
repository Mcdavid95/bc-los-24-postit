import React from 'react';
import $ from 'jquery';
import { shallow } from 'enzyme';
import { Message } from '../../src/containers/Message';


global.$ = $;

const instance = () => {
  const props = {
    addUserRequest: jest.fn(() => Promise.resolve()),
    createGroupRequest: jest.fn(() => Promise.resolve()),
    allUsers: [],
    match: {
      params: { groupId: 1 }
    },
    getAllUsers: jest.fn(() => Promise.resolve()),
    getGroupMessages: jest.fn(() => Promise.resolve()),
    getUserGroups: jest.fn(() => Promise.resolve()),
    groupMessages: [],
    postMessageRequest: jest.fn(() => Promise.resolve()),
  };
  return shallow(<Message {...props} />);
};

const wrapper = instance();

describe('Message component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    const props = {
      addUserRequest: jest.fn(() => Promise.resolve()),
      allUsers: [{ users: [{ id: 3, username: 'mcdavid' }] }],
      groupId: '',
      getAllUsers: jest.fn(() => Promise.resolve())
    };
    const nextprops = props;
    wrapper.setState({
      match: {
        params: { groupId: 1 }
      },
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextprops);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentDidMount method', () => {
    wrapper.setState({
      match: {
        params: { groupId: 1 }
      },
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentDidMount');
    expect(onSubmitSpy).toBeDefined();
  });
});
