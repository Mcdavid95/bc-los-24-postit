import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupList from '../containers/GroupList';
/**
 * 
 */
export class SideNav extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.userGroupList = this.props;
  }
  /**
   * @return {DOM} Dom component
   */
  render() {
    return (
      // <div className="row">
      <div className="container">
        <ul id="slide-out" className="side-nav side fixed">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="http://res.cloudinary.com/mc-cloud/image/upload/v1508780925/518079-background-hd_r3xazi.jpg" alt="background" />
              </div>
              <a
                href="#!name"
              ><span className="white-text name">{this.props.userDetails.user.name}</span></a>
              <a
                href="#!email"
              ><span className="white-text email">{this.props.userDetails.user.email}</span></a>
            </div></li>
          <li><a className="modal-trigger" href="#modal1">Create New Group <i className="material-icons right ">group_add</i></a></li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a
                  className="collapsible-header"
                >My Groups<i className="material-icons">arrow_drop_down</i></a>
                <div className="collapsible-body">
                  <ul>
                    <GroupList userGroupList={this.props.userGroupList} />
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <button
          data-activates="slide-out"
          id="side-nav"
          className="button-collapse show-on-large"
        >
          <i
            className="material-icons tooltipped"
            data-position="right"
            data-delay="50"
            data-tooltip="My Groups"
          >group</i></button>
      </div>
      // </div>
    );
  }
}

SideNav.propTypes = {
  userGroupList: PropTypes.array.isRequired,
  userDetails: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  userGroupList: state.userGroupList,
  userDetails: state.setAuthToken
});

export default connect(mapStateToProps)(SideNav);
