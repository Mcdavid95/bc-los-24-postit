import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header';

/**
 * @class 
 */
export default class Layout extends Component {
  /**
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
  }

  /**
   * @return {Object} DOM element
   */
  render() {
    return (
      <div>
        <Header />
        <h1> Welcome to Postit!! Mcdavid </h1>
        <Link to="signup" className="btn red lighten-1 btn-sm">Register</Link>
        <Link to="login">Login</Link>
      </div>
    );
  }
}
