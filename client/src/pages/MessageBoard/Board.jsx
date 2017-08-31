import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import FlashMessage from '../../containers/FlashMessageList';
import SideNav from '../sideNav';
import Footer from '../../containers/Footer';
import Message from '../../containers/Message';
import GroupForm from '../../containers/GroupForm';
import createGroupRequest from '../../actions/createGroupAction';
/**
 * @class
 */
class Board extends Component {
  /**
   * @return{DOM} returns DOM element
   */
  render() {
    const { createGroupRequest } = this.props;
    return (
      <div>
        <Header />
        <FlashMessage />
        <SideNav />
        <Message />

        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <button type="button" className="waves-effect waves-light btn modal-close" data-dismiss="modal">&times;</button>
            <h1>Create New Group</h1>
            <GroupForm createGroupRequest={createGroupRequest} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
          </div>
        </div>
        <main />
        <Footer />
      </div>
    );
  }
}

Board.propTypes = {
  createGroupRequest: PropTypes.func.isRequired
};

export default connect(null, { createGroupRequest })(Board);
