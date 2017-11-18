import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Messageboard from './MessageBoard';
import Messageform from './MessageForm';
import Groupform from '../containers/GroupForm';
import Header from '../components/Header/Header';
import Sidenav from '../containers/SideNav';
import Footer from '../containers/Footer';
import { createGroupRequest, getUserGroups, groupMembers, addUserRequest, getGroupMessages, postMessageRequest, getAllUsers } from '../actions';
import initialState from '../initialState';
import AddUserform from './AddUserForm';
/**
 * @class Message
 * @extends React.Component
 */
export class Message extends Component {
  /**
   * @constructor
   * @description Creates Instance of Message
   * @memberOf Message
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.userGroupList = this.props;
    this.state = {
      messages: this.props.groupMessages,
      postMessage: initialState.postMessage,
      match: this.props.match,
      users: this.props.allUsers
    };
  }
  /**
   *
   * @return {*} loads actions when page loads initially
   */
  componentDidMount() {
    this.props.getUserGroups();
    this.props.getGroupMessages(this.props.match.params.groupId);
    this.props.groupMembers(this.props.match.params.groupId);
    this.props.getAllUsers();

    $('select').material_select();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50 });
  }
  /**
   * 
   * @param {*} nextProps 
   * @return {*} update state
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      match: nextProps.match
    });
  }


  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div >
        <Header groupId={this.props.match.params.groupId} />
        <main>
          <Sidenav groupId={this.props.match.params.groupId} />
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">
              <h3 className="group-form heading">Create New Group</h3>

              <Groupform createGroupRequest={this.props.createGroupRequest} />
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >Close</a>
            </div>
          </div>
          <div id="modal2" className="modal modal-fixed-footer">
            <div className="modal-content" id="options">
              <h3 className="heading">Add New User To This Group</h3>
              <AddUserform
                addUserRequest={this.props.addUserRequest}
                groupId={this.props.match.params.groupId}
              />
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-action modal-close waves-effect waves-green btn-flat "
              >Close</a>
            </div>
          </div>
          <div className="row page">
            <Messageboard
              groupMessages={this.state.messages}
              groupId={this.props.match.params.groupId}
            />
            <Messageform
              groupId={this.props.match.params.groupId}
              postMessageRequest={this.props.postMessageRequest}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userGroupList: state.userGroupList,
  groupMessages: state.groupMessages,
  allUsers: state.allUsers
});

Message.propTypes = {
  addUserRequest: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired,
  createGroupRequest: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  groupMessages: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  postMessageRequest: PropTypes.func.isRequired,
  groupMembers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  {
    addUserRequest,
    getUserGroups,
    getAllUsers,
    createGroupRequest,
    getGroupMessages,
    groupMembers,
    postMessageRequest })(Message);
