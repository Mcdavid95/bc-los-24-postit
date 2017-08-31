import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import LoginForm from '../../containers/LoginForm';
import userLoginRequest from '../../actions/loginActions';
import FlashMessage from '../../containers/FlashMessageList';
import Footer from '../../containers/Footer';

/**
 * @class
 */
class Login extends Component {
  /**
   * @return {Object} DOM element
   */
  render() {
    const { userLoginRequest } = this.props;
    return (
      <div>
        <Header />
        <FlashMessage />
        <main>
        <div className="row">
          <div className=" col-lg-9 col-sm-12 col-md-6">
            <h1>Welcome to <span className="brand" id="top">POSTIT!!</span></h1>
            <h5>Connect to friends and loved ones all it takes is a click!!! Login to get started</h5>
            <p id="signup">Don't have an account? Click <Link to="/register">here to Register</Link></p>
          </div>
          <LoginForm userLoginRequest={userLoginRequest} />
        </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userLoginRequest
})(Login);
