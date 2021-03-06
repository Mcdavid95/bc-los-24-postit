import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { Link } from 'react-router-dom';
import { getGroupMessages, currentGroup, groupMembers } from '../actions';
import history from '../utils/History';
/**
 * @class GroupList
 * @extends React.Component
 */
export class GroupList extends Component {
  /**
   * @constructor
   * @description Creates Instance of Group Form
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.groupMessages = this.props;
    this.state = {
      groups: this.props.userGroupList
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @method componentWillReceiveProps
   * @param { Array } nextProps 
   * @return {Array} new State
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userGroupList.length === 1) {
      this.setState({
        groups: nextProps.userGroupList[0]
      });
    } else {
      this.setState({
        groups: nextProps.userGroupList[nextProps.userGroupList.length - 1]
      });
    }
  }

  /**
   * @method onClick
   * @param {*} groupId
   * @return {*} any
   */
  onClick(groupId) {
    this.props.getGroupMessages(groupId);
    this.props.currentGroup(groupId);
    this.props.groupMembers(groupId)
      .then(() => {
        history.push(`/group/${groupId}/messages`);
      })
    ;
  }
  /**
   * @method render
   * @return {Object} DOM Object
   */
  render() {
    return (
      <ul className="row group-list">
        {!this.state.groups ? (<li> No groups Yet</li>) : this.state.groups.map(group =>
          (<li key={shortId.generate()}>
            <div className="col s12">
              <div className="black">
                <Link onClick={() => this.onClick(group.groupId)} to={`/group/${group.groupId}/messages`}><span className="card-title list-group"> {group.groupName}</span></Link>
              </div>
            </div>
          </li>)
        )}
      </ul>
    );
  }
}


GroupList.propTypes = {
  userGroupList: PropTypes.array.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  currentGroup: PropTypes.func.isRequired,
  groupMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupMessages: state.groupMessages,
  userGroupList: state.userGroupList,
});

export default connect(mapStateToProps,
  { getGroupMessages, currentGroup, groupMembers })(GroupList);
