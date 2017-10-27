import React from 'react';
import { shallow } from 'enzyme';
import { GroupForm } from '../../src/containers/GroupForm';

const instance = () => {
  const props = {
    createGroupRequest: jest.fn(() => Promise.resolve()),
  };
  return shallow(<GroupForm {...props} />);
};

const wrapper = instance();

describe('Group form component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = wrapper;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'username', description: 'mcdavid'
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
});
