import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../containers/Footer';
import initialState from '../initialState';
import forgotPasswordRequest from '../actions/forgotPasswordAction';
/**
 * @class
 */
class ForgotPasswordPage extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = initialState.forgotPassword;

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
    this.props.forgotPasswordRequest(this.state);
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
            <h5 id="forgot-password" className="center-align">Input the email address associated with your account</h5>
          </div>
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field">
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
            </div>
            <button type="submit" className="form-control btn btn-login btn-primary">Send</button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { forgotPasswordRequest })(ForgotPasswordPage);
