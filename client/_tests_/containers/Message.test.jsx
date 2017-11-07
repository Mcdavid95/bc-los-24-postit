import React from 'react';
import $ from 'jquery';
import { shallow } from 'enzyme';
import { Message } from '../../src/containers/Message';
import { props, nextProps } from '../_mocks_/components.mock';


global.$ = $;

const instance = () => shallow(<Message {...props} />);

const wrapper = instance();

describe('Message component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      match: props.match
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentDidMount method', () => {
    wrapper.setState({
      match: props.match
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentDidMount');
    expect(onSubmitSpy).toBeDefined();
  });
});
