import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import initialState from '../initialState';
/**
 * @class LoginForm
 * @extends React.Component
 */
export default class LoginForm extends Component {
  /**
   * @constructor
   * @description Creates Instance of LoginForm
   * @param {Object} props 
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = initialState.login;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @method onChange
   * @param {Event} event 
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @method onSubmit
   * @param {Event} event 
   * @return {Object} new State
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userLoginRequest(this.state);
  }
  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="email" className="control-label">Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              className="form-control login"
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
              className="form-control login"
              placeholder="..........."
              required
              onChange={this.onChange}
            />
          </div>
          <div className="row">
            <button type="submit" className="btn">Login</button>
            <p><Link to="/forgot-password"> Forgot password? click to reset </Link></p>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};
