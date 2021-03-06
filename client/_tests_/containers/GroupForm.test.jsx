import React from 'react';
import { mount } from 'enzyme';
import { GroupForm } from '../../src/containers/GroupForm';
import { props, target } from '../_mocks_/components.mock';

const instance = () => mount(<GroupForm {...props} />);

const wrapper = instance();

describe('Group form component test', () => {
  it('should contain the method onChange', () => {
    const component = wrapper;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target
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
