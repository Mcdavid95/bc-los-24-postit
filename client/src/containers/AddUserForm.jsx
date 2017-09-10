import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../initialState';
import users from '../actions/getAllUsersActions';
import addUserRequest from '../actions/addUserToGroupAction';
/**
 * @class
 */
class AddUserForm extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: initialState.addUser,
      users: this.props.allUsers
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {object} nextProps 
   * @return {object} new state
   */
  componentWillReceiveProps(nextProps) {
    console.log(this.props.allUsers);
    this.setState({
      users: nextProps.allUsers[0]
    });
  }
  /**
 * 
 * @param {Event} e 
 * @return {object} new state
 */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  /**
 * 
 * @param {Event} e 
 * @return {func} send request to api
 */
  onSubmit(e) {
    e.preventDefault();
    this.props.addUserRequest(this.state, this.props.groupId)
      .then(() => {
        this.props.users();
      });
  }

  /**
   * @return {object} DOM Object
   */
  render() {
    return (
      <div className="row">
        <div>
          <form onSubmit={this.onSubmit} className="col s12">
            <div className="input-field col s12" >
              <label htmlFor="user" className="control-label">Username: </label>
              <input
                onChange={this.onChange}
                list="users"
                type="text"
                id="user"
                className="form-control"
                name="username"
                required
                value={this.state.username.username}

              />
              <datalist id="users">
                {this.state.users.map(user =>
                  (<option key={user.id} value={user.username} />)
                )}
              </datalist>
            </div>
            <button
              type="submit"
              className="btn waves-effect waves-light modal-action modal-close"
            >Add User</button>
          </form>
        </div>
      </div>
    );
  }
}

AddUserForm.propTypes = {
  allUsers: PropTypes.array.isRequired,
  addUserRequest: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  users: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  allUsers: state.allUsers
});

export default connect(mapStateToProps, { users, addUserRequest })(AddUserForm);
