import React from 'react';
import { shallow } from 'enzyme';
import { AddUserForm } from '../../src/containers/AddUserForm';

const instance = () => {
  const props = {
    addUserRequest: jest.fn(() => Promise.resolve()),
    allUsers: [],
    groupId: '',
    getAllUsers: jest.fn(() => Promise.resolve())
  };
  return shallow(<AddUserForm {...props} />);
};

const wrapper = instance();

describe('AddUser form component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = wrapper;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'username', value: 'mcdavid'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
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
      users: [{ id: 3, username: 'mcdavid' }]
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextprops);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
