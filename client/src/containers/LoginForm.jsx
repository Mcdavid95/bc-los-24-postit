import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import initialState from '../initialState';
/**
 * @class
 */
export default class LoginForm extends Component {
  /**
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = initialState.login;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {Event} e 
   * @return {Object} updates State
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * 
   * @param {Event} e 
   * @return {Object} new State
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.userLoginRequest(this.state);
  }
  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="email" className="control-label">Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              className="form-control"
              placeholder="EMMY"
              required
              onChange={this.onChange}
            />
          </div>
          <hr />
          <br />
          <div className="input-field">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              className="form-control"
              placeholder="..........."
              required
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="form-control btn btn-login btn-primary">Login</button>
          <hr />
          <br />
          <p><Link to="#"> Forgot password?</Link></p>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};
