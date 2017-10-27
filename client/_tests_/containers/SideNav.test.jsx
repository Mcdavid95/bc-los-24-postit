import React from 'react';
import { shallow } from 'enzyme';
import { SideNav } from '../../src/pages/SideNav';

const instance = () => {
  const props = {
    userGroupList: [],
    userDetails: {
      user: {
        name: 'mcdavid',
        email: 'mcdave@gmail.com'
      }
    },
  };
  return shallow(<SideNav {...props} />);
};

const wrapper = instance();

describe('Side Nav component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });
});
