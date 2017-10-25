import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import initialState from '../initialState';


/**
 * @class Signup
 */
export default class SignupForm extends Component {
  /**
   * @constructor
   * @param {State} props 
   */
  constructor(props) {
    super(props);
    this.state = initialState.signup;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {Event} e 
   * @return {state} sets state of button
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * @param {Event} e 
   * @return {state} updates state
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div className="container">
        <h1 className="center-align" id="acct">CREATE AN ACCOUNT</h1>

        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="control-label">Email</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="username"
                  type="text"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <label htmlFor="username" className="control-label">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  min="10"
                  required
                  title="Phone Number must be 10 or more digits"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                />
                <label htmlFor="phone" className="control-label">Phone:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  pattern=".{5,10}"
                  required
                  title="Password must be between 5 and 10 characters"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="control-label">Password:</label>
              </div>
            </div>
            <div className="row">
              <button type="submit" className="btn btn-success" href="#">Submit</button>
              <p
                className="col s12 m6"
                id="signin"
              >
                Already have an account? <Link
                  to="/login"
                >
                Login</Link> to continue with the app </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

