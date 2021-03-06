import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../src/containers/LoginForm';
import { props, user } from '../_mocks_/components.mock';

describe('Signin form component test', () => {
  it('should render without crashing', () => {
    const component = shallow(<LoginForm />);
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<LoginForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: user
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = shallow(<LoginForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
