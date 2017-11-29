import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import LoginForm from '../../containers/LoginForm';
import { userLoginRequest } from '../../actions';
import Footer from '../../containers/Footer';

/**
 * @method Login
 * @param {*} props 
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const Login = props => (
  <div>
    <Header />
    <main>
      <div className="container">
        <div className="heading center">
          <h4>Welcome to <span className="brand" id="top">POSTIT!!</span></h4>
          <p>
              Connect to friends and loved ones all it takes is a click!!! Login to get started
          </p>
        </div>
        <LoginForm userLoginRequest={props.userLoginRequest} />
      </div>
    </main>
    <Footer />
  </div>
);

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userLoginRequest
})(Login);
