import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import SignupForm from '../../containers/SignUpForm';
import userSignupRequest from '../../actions/signupActions';


class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <Header />
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    );
  }
}
Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userSignupRequest
})(Signup);
