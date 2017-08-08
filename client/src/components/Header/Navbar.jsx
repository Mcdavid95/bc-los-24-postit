import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div>
          <nav>
            <div className="nav-wrapper container">
              <Link to="board" className="brand-logo center" id="brand">POSTIT!!</Link>
              <Link to="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">Menu</i>
              </Link>
              <ul className="right hide-on-med-and-down">
                <li className="active"><Link to="board">Home</Link></li>
                <li><Link to="#">New message</Link></li>
                <li><Link to="#">JavaScript</Link></li>
              </ul>
              <ul className="right">
                <li><Link to="login">Login <span className="glyphicon glyphicon-user" /></Link></li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><Link to="login">Home</Link></li>
                <li><Link to="#">New message</Link></li>
                <li><Link to="#">JavaScript</Link></li>
              </ul>
            </div>
          </nav>
      </div>
    );
  }
}
