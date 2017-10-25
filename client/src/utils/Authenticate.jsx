import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './History';

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
    isAuthenticated: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setAuthToken.isAuthenticated,
  });

  return connect(mapStateToProps)(Authenticate);
};
export default AuthenticateFunc;
