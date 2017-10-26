import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import SideNav from '../sideNav';
import Footer from '../../containers/Footer';
import GroupForm from '../../containers/GroupForm';
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
    $('select').material_select();
    this.props.getGroupMessages(1);
    $('.modal').modal();
  }
  /**
   * @return{DOM} returns DOM element
   */
  render() {
    return (
      <div>
        <Header />
        <main>
          <SideNav />
          <div id="modal1" className="modal modal-fixed-footer">
            <div className="modal-content">
              <button type="button" className="waves-effect waves-light btn modal-close" data-dismiss="modal">&times;</button>
              <h1 className="group-form">Create New Group</h1>
              <GroupForm createGroupRequest={this.props.createGroupRequest} />
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
            </div>
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
  getGroupMessages: PropTypes.func.isRequired,
  userGroupList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({ userGroupList: state.userGroupList });

export default connect(mapStateToProps, { createGroupRequest, getUserGroups, getGroupMessages })(Board);
