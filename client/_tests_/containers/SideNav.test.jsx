import React from 'react';
import { shallow } from 'enzyme';
import { SideNav } from '../../src/pages/SideNav';
import { props } from '../_mocks_/components.mock';

const instance = () => shallow(<SideNav {...props} />);

const wrapper = instance();

describe('Side Nav component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });
});
