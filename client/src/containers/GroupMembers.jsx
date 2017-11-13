import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { groupMembers } from '../actions';

/**
 * @class GroupMembers
 * @extends React.Component
 */
export class GroupMembers extends Component {
  /**
   * @constructor
   * @description Creates Instance of class GroupMember
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.memberList
    };
  }

  /**
   * @method componentDidMount
   * @memberOf GroupMember
   * @returns {void}
   */
  componentDidMount() {
    this.props.groupMembers(this.props.groupId);
  }
  /**
   * @method componentWillReceiveProps
   * @param { Array } nextProps 
   * @return {Array} new State
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.memberList === 1) {
      this.setState({
        members: nextProps.memberList[0]
      });
    } else {
      this.setState({
        members: nextProps.memberList[nextProps.memberList.length - 1]
      });
    }
  }
  /**
   * @memberOf GroupMembers
   * @method render
   * @return {Object} DOM Object
   */
  render() {
    return (
      <div>
        <ul className="row group-list">
          {this.state.members.map(member =>
            (
              <li key={member.id}>
                <div className="col s12">
                  <div className="black">
                    <span
                      className="card-title list-members"
                    > {member.username}</span>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

GroupMembers.propTypes = {
  groupMembers: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  memberList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  memberList: state.groupMembers,
});

export default connect(mapStateToProps, { groupMembers })(GroupMembers);
