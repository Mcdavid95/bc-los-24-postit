import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../src/containers/LoginForm';

const userData = {
  username: 'username',
  password: 'janike_13'
};

// const wrapper = mount(
//   <SignupForm props={userLoginRequest(userData)} />
// )

describe('Signin form component test', () => {
  const props = {
    userLoginRequest: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<LoginForm />);
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<LoginForm {...props} />);
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
    const component = shallow(<LoginForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
