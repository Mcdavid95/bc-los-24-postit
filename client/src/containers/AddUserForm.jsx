import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../initialState';
import { searchUsers, addUserRequest, groupMembers } from '../actions';
/**
 * @class AddUserForm
 * @extends React.Component
 */
export class AddUserForm extends Component {
  /**
   * Creates Instance of AddUserForm
   * @param {*} props 
   * @memberOf AddUserForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: initialState.addUser,
      result: [{ id: 1 }],
      offset: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @method ComponentWillRecieveProps
   * @param {object} nextProps 
   * @return {object} new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.result.length === 0) {
      this.setState({
        result: nextProps.result.users.users,
      });
    } else if (typeof (nextProps.result.username) === 'string') {
      this.setState({
        result: []
      });
    } else {
      this.setState({
        result: nextProps.result[nextProps.result.length - 1].users.users,
      });
    }
  }
  /**
 * @description updates state when props changes
 * @param {Event} event 
 * @return {object} new state
 */
  onChange(event) {
    const searchInput = {
      username: event.target.value
    };
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.searchUsers(searchInput, this.state.offset);
  }
  /**
 * 
 * @param {Event} event 
 * @return {func} send request to api
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.addUserRequest(this.state, this.props.groupId)
      .then(() => {
        this.props.groupMembers(this.props.groupId);
        this.setState({
          username: initialState.addUser
        });
      });
  }

  /**
   * @description returns list of users per search term
   * @method render 
   * @return {object} DOM Object
   */
  render() {
    return (
      <div className="row">
        <div>
          <form id="reset" onSubmit={this.onSubmit} className="col s12">
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
                {this.state.result.map(user =>
                  (<option key={user.id} value={user.username} />)
                )}
              </datalist>
            </div>
            <button
              type="submit"
              className="btn waves-effect waves-light modal-action"
            >Add User</button>
          </form>
        </div>
      </div>
    );
  }
}

const addUserFormPropTypes = () => {
  const addUserForm = new AddUserForm();
  if (Array.isArray(addUserForm.props.result)) {
    return {
      addUserRequest: PropTypes.func.isRequired,
      groupId: PropTypes.string.isRequired,
      searchUsers: PropTypes.func.isRequired,
      result: PropTypes.array.isRequired,
      groupMembers: PropTypes.func.isRequired
    };
  }
  return {
    addUserRequest: PropTypes.func.isRequired,
    groupId: PropTypes.string.isRequired,
    searchUsers: PropTypes.func.isRequired,
    result: PropTypes.object.isRequired,
    groupMembers: PropTypes.func.isRequired
  };
};

AddUserForm.propTypes = addUserFormPropTypes;

const mapStateToProps = state => ({
  result: state.search
});

export default connect(mapStateToProps, { searchUsers, addUserRequest, groupMembers })(AddUserForm);
