import React from 'react';
import { shallow } from 'enzyme';
import { MessageBoard } from '../../src/containers/MessageBoard';

const instance = () => {
  const props = {
    groupId: '',
    groupMessages: [],
    history: {}
  };
  return shallow(<MessageBoard {...props} />);
};

const wrapper = instance();

describe('Message Board component test', () => {
  it('should render without crashing', () => {
    const component = wrapper;
    expect(component.node.type).toBe('div');
  });

  it('should contain the componentWillReceiveProps method', () => {
    const props = {
      groupId: '',
      groupMessages: [[{ messages: 'mcdavid', priority: 'nothing' }, { message: 'laugh', priority: 'nothing' }]],
    };
    const nextprops = props;
    wrapper.setState({
      messages: [{ id: 3, username: 'mcdavid' }]
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextprops);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the componentWillReceiveProps method', () => {
    const props = {
      groupMessages: [[{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }], [{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }]],
      groupId: 1
    };
    const nextProps = props;
    wrapper.setState({
      groups: [[{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }], [{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }]],
    });
    const component = wrapper;
    const onSubmitSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
