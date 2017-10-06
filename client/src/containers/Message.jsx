import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageBoard from './MessageBoard';
import MessageForm from './MessageForm';
import GroupForm from '../containers/GroupForm';
import Header from '../components/Header/Header';
import SideNav from '../pages/sideNav';
import Footer from '../containers/Footer';
import loadGroups from '../actions/loadUserGroupListActions';
import messages from '../actions/getMessagesActions';
import initialState from '../initialState';
import postMessagesRequest from '../actions/postMessageAction';
import AddUserForm from './AddUserForm';
import users from '../actions/getAllUsersActions';
/**
 * @class
 */
class Message extends Component {
  /**
   * 
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
 * @return {*} loads actions when page loads initially
 */
  componentDidMount() {
    this.props.loadGroups();
    this.props.messages(this.props.match.params.groupId);
    this.props.users();

    $('select').material_select();
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
      <div>
        <Header />
        <main>
          <SideNav groupId={this.props.match.params.groupId} />
          <div id="modal1" className="modal  modal-fixed-footer">
            <div className="modal-content">

              <button
                type="button"
                className="waves-effect waves-light btn modal-close"
                data-dismiss="modal"
              >&times;</button>

            
              <GroupForm createGroupRequest={this.props.createGroupRequest} />
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
              <button
                type="button"
                className="waves-effect waves-light btn modal-close"
                data-dismiss="modal"
              >&times;</button>
              <h1>Add New User To This Group</h1>
              <AddUserForm
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
          <div className="row">
            <a className="modal-trigger center-align waves-effect waves-light btn" id="users" href="#modal2">Add new user</a>
            <MessageBoard
              groupMessages={this.state.messages}
              groupId={this.props.match.params.groupId}
            />
            <MessageForm
              groupId={this.props.match.params.groupId}
              postMessagesRequest={this.props.postMessagesRequest}
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
  match: PropTypes.object.isRequired,
  messages: PropTypes.func.isRequired,
  groupMessages: PropTypes.array.isRequired,
  postMessagesRequest: PropTypes.func.isRequired,
  loadGroups: PropTypes.func.isRequired,
  userGroupList: PropTypes.array.isRequired,
  users: PropTypes.func.isRequired,
  addUserRequest: PropTypes.func.isRequired,
  createGroupRequest: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired

};

export default connect(mapStateToProps,
  { loadGroups,
    users,
    messages,
    postMessagesRequest })(Message);
