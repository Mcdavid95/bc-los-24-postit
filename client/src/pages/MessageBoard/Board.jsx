import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import SideNavigation from '../SideNav';
import Footer from '../../containers/Footer';
import GroupForms from '../../containers/GroupForm';
import { createGroupRequest, getUserGroups, getGroupMessages } from '../../actions';
/**
 * @class
 */
class Board extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.userGroupList = this.props;
  }
  /**
   *  @return {DOM} DOM elements
   */
  componentDidMount() {
    this.props.getUserGroups();
    $(document).ready(() => {
      $('.collapsible').collapsible();
      $('.button-collapse').sideNav();
      $('select').material_select();
      $('.modal').modal();
    });
  }
  /**
   * @return{DOM} returns DOM element
   */
  render() {
    return (
      <div>
        <Header />
        <main>
          <SideNavigation />
          <div id="modal1" className="modal modal-fixed-footer">
            <div className="modal-content">
              <h3 className="group-form heading">Create New Group</h3>
              <GroupForms createGroupRequest={this.props.createGroupRequest} />
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >Close</a>
            </div>
          </div>
          <div className="white-board black-text">
            <img height="15%" id="mail-box" src="http://res.cloudinary.com/mc-cloud/image/upload/v1509614951/mcdavid_umplak.png" alt="message" />
            <h4
              className="heading"
            >Welcome <span className="caps">{this.props.userDetails.user.name}</span></h4>
            <h6 id="clear"> You Currently have no group selected<br /><br />
             Please pick one by clicking on the
              <i
                className="material-icons teal-text"
              >
              group
              </i> icon on the left hand side of this page to access the  group options</h6>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Board.propTypes = {
  createGroupRequest: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userGroupList: state.userGroupList,
  userDetails: state.setAuthToken
});

export default connect(mapStateToProps, {
  createGroupRequest,
  getUserGroups,
  getGroupMessages })(Board);

