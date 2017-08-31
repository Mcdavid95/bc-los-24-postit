import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import history from '../utils/History';
/**
 * 
 */
class GroupList extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groups: this.props.userGroupList
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * 
   * @param { Array } nextProps 
   * @return {Array} new State
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.userGroupList[0]
    });
  }

  onClick(groupId) {
    history.push(`dashboard/group/:${groupId}`);
  }
  /**
   * 
   */
  render() {
    return (
      <ul>
        {this.state.groups.map(groups =>
          (<li className="list-group" key={groups.groupId}>
            <Link to={`dashboard/group/:${groups.groupId}`} onClick={this.onClick}>
              <h5>{groups.groupName}</h5>
            </Link>
          </li>)
        )}
      </ul>
    );
  }
}


GroupList.propTypes = {
  userGroupList: Proptypes.array.isRequired
};

export default GroupList;
