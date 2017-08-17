import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div className="form-margin">
        <main>
          <div className="container" id="content">
            <div className="row">
              <div className="col s12 m6 l9">
                <h1><span id="acct">Create an Account</span></h1>
              </div>
            </div>

            <form onSubmit={this.onSubmit}>

              <div className="form-group col s12 m6 l9">
                <label htmlFor="username" className="control-label">User Name:</label>
                <input
                  className="form-control"
                  name="username"
                  type="text"
                  placeholder="Doe"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <hr />
              <div className="form-group col s12 m6 l9">
                <label htmlFor="email" className="control-label">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="your email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <hr />
              <div className="form-group col s12 m6 l9">
                <label htmlFor="phone" className="control-label">Phone:</label>
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
                <hr />
                <label htmlFor="password" className="control-label">Password:</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="password"
                  pattern=".{5,10}"
                  required
                  title="Password must be between 5 and 10 characters"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <hr />

              <button type="submit" className="btn btn-success" href="#">Submit</button>

            </form>
          </div>
        </main>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

