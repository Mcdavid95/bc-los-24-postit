import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupList from '../containers/GroupList';
/**
 * 
 */
class SideNav extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.userGroupList = this.props;
  }
  /**
   * 
   */
  render() {
    <div />;

    return (
      <div className="row">
        <div className="col s12 m4 l3">
          <ul id="slide-out" className="side-nav fixed">
            <li><a className="modal-trigger" href="#modal1">Create New Group</a></li>
            <GroupList className="list-group" userGroupList={this.props.userGroupList} />
          </ul>
          <a href="#" data-activates="slide-out" id="side-nav" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
        </div>
      </div>
    );
  }
}

GroupList.propTypes = {
  userGroupList: PropTypes.array.isRequired

};
const mapStateToProps = (state, ownProps) => ({ userGroupList: state.userGroupList });

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(getUserGroups, dispatch)
// });

export default connect(mapStateToProps)(SideNav);
