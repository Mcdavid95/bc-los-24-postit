import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../src/containers/Footer';

const instance = () => shallow(<Footer />);

const wrapper = instance();

describe('Message form component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('footer');
  });
});
