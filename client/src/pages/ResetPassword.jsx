import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../containers/Footer';
import initialState from '../initialState';
import { confirmPasswordReset } from '../actions';
/**
 * @class
 */
class ResetPasswordPage extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = initialState.resetPassword;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {Event} e 
   * @return {*} updates state for any change
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * 
   * @param {*} e 
   * @return {action} dispatches an action
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.confirmPasswordReset(this.props.match.params.token, this.state);
  }
  /**
   * @return {DOM} DOM
   */
  render() {
    return (
      <div>
        <Header />
        <main>
          <div>
            <h5
              id="forgot-password"
              className="center-align"
            >Type in new Password to Access your account</h5>
          </div>
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  name="newPassword"
                  required
                  value={this.state.newPassword}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="control-label">New Password</label>
              </div>

              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  name="confirmPassword"
                  required
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="control-label">Confirm Password</label>
              </div>
            </div>
            <button type="submit" className="form-control btn btn-login btn-primary">Send</button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  confirmPasswordReset: PropTypes.func.isRequired
};

export default connect(null, { confirmPasswordReset })(ResetPasswordPage);
