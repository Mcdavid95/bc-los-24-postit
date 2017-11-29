import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/components/Header/Header';

const instance = () => shallow(<Header />);

const wrapper = instance();

describe('Message form component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('header');
  });
});
