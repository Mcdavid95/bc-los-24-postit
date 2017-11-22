import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import SignupForm from '../../containers/SignupForm';
import { userSignupRequest } from '../../actions';
import Footer from '../../containers/Footer';

/**
 * @method Signup
 * @param {*} props 
 * @returns {DOM} DOM Element
 * @description renders the signup page
 */
const Signup = props => (
  <div>
    <Header />
    <SignupForm userSignupRequest={props.userSignupRequest} />
    <Footer />
  </div>
);
Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userSignupRequest
})(Signup);
