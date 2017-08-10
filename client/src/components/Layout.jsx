import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header.jsx';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <h1> Welcome to Postit!! Mcdavid </h1>
        <Link  to="/signup" className="btn red lighten-1 btn-sm">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
