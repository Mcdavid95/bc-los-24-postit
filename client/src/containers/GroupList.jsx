import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGroupMessages } from '../actions';
import history from '../utils/History';
/**
 * @class GroupList
 * @extends React.Component
 */
export class GroupList extends Component {
  /**
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
        groups: nextProps.userGroupList[1]
      });
    }
  }

  /**
   * @method onClick
   * @param {*} event 
   * @return {*} any
   */
  onClick(e) {
    console.log(this.props.match.params.groupId);
    e.preventDefault();
    this.props.getGroupMessages(this.props.match.params.groupId)
      .then(() => {
        history.push(`/group/${this.props.match.params.groupId}/messages`);
      })
    ;
  }
  /**
   * @return {Object} DOM Object
   */
  render() {
    return (
      <ul className="row group-list">
        {this.state.groups.map(group =>
          (<li key={group.groupId}>
            <div className="col s12">
              <div className="card blue-grey darken-1">
                <Link onClick={this.onClick} to={`/group/${group.groupId}/messages`}><span className="card-title list-group"> {group.groupName}</span></Link>
              </div>
            </div>
          </li>)
        )}
      </ul>
    );
  }
}


GroupList.propTypes = {
  match: PropTypes.object.isRequired,
  userGroupList: PropTypes.array.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  groupMessages: state.groupMessages
});

export default connect(mapStateToProps, { getGroupMessages })(GroupList);
