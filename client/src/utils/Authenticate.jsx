import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './History';
import flashMessage from '../actions/flashMessageAction';

const AuthenticateFunc = (ComposedComponent) => {
  /**
   * 
   */
  class Authenticate extends Component {
    /**
     * @return {*} set user authentication status
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.flashMessage({
          type: 'error',
          text: 'You need to be loggedIn first'
        });
        history.push('/login');
      }
    }
    /**
     * 
     * @param {*} nextProps 
     * @return {*} props
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.isAuthenticated = false;
        history.push('/login');
      }
    }
    /**
 * @return {DOM} DOM
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    flashMessage: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setAuthToken.isAuthenticated,
    addflashMessage: state.addflashMessages
  });

  return connect(mapStateToProps, { flashMessage })(Authenticate);
};
export default AuthenticateFunc;
