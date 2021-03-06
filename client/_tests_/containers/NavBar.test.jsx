import React from 'react';
import $ from 'jquery';
import { shallow } from 'enzyme';
import { Navbar } from '../../src/components/Header/Navbar';
import { props, nextProps } from '../_mocks_/components.mock';


global.$ = $;

const instance = () => shallow(<Navbar {...props} />);

const wrapper = instance();

describe('Navbar component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    wrapper.setState({
      match: nextProps.match
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentDidMount method', () => {
    wrapper.setState({
      match: nextProps.match
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentDidMount');
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('should contain the logout method', () => {
    wrapper.setState({
      match: {
        params: { groupId: 1 }
      },
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'logout');
    expect(onSubmitSpy).toBeDefined();
  });
});
