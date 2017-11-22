import React from 'react';
import { mount } from 'enzyme';
import { AddUserForm } from '../../src/containers/AddUserForm';
import { props, nextProps } from '../_mocks_/components.mock';

const instance = () => mount(<AddUserForm {...props} />);

const wrapper = instance();

describe('AddUser form component test', () => {
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
    wrapper.setState({
      users: [{ id: 3, username: 'mcdavid' }],
      result: nextProps.result[0].users.user
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
