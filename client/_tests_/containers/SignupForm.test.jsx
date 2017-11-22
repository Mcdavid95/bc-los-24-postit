import React from 'react';
import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import SignupForm from '../../src/containers/SignupForm';

describe('Signup form component test', () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<SignupForm />);
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SignupForm {...props} />);
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
    const component = shallow(<SignupForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
