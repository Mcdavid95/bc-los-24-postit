import React from 'react';
import { shallow } from 'enzyme';
import { MessageForm } from '../../src/containers/MessageForm';
import { props } from '../_mocks_/components.mock';

const instance = () => shallow(<MessageForm {...props} />);

const wrapper = instance();

describe('Message form component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });
  it('should contain the method onChange', () => {
    const component = wrapper;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        message: 'username', priority: 'normal'
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

  it('should contain the method handleSelectChange', () => {
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'handleSelectChange');
    component.instance().handleSelectChange({
      target: {
        priority: 'normal'
      }
    });
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
