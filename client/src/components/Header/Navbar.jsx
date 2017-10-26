import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions';
import initialState from '../../initialState';
//
/**
 * @class
 */
class Navbar extends Component {
/**
 * 
 * @param {*} props 
 */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: initialState.setAuthToken.isAuthenticated
    };
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.props.setAuthToken;
  }
  /**
 * 
 * @param {boolean} nextProps 
 * @return {boolean} set auth status
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: !nextProps.setAuthToken.isAuthenticated
    });
  }

  /**
   * @return {Props} listens for event and returns props
   * @param {*} e 
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  /**
   * @return {DOM} Renders Dom Elements
   */
  render() {
    const { isAuthenticated } = this.props.setAuthToken;
    console.log('===========', this.props);
    const userLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="dashboard" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/login" onClick={this.logout}>LOGOUT</NavLink></li>
          <li><NavLink to="#" activeClassName="active">About</NavLink></li>
        </ul>
        <NavLink to="/search-user" className="right" activeClassName="active">Search User</NavLink>
      </div>
    );

    const guestLinks = (
      <ul className="right hide-on-med-and-down">
        <li><NavLink to="#" activeClassName="active">About</NavLink></li>
      </ul>
    );

    const sideNavUsers = (
      <ul className="side-nav" id="mobile-demo">
        <li><NavLink to="/dashboard" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/login" onClick={this.logout}>LOGOUT</NavLink></li>
        <li><NavLink to="#" activeClassName="active">About</NavLink></li>
      </ul>
    );

    const sideNavGuests = (
      <ul className="side-nav" id="mobile-demo">
        <li><NavLink to="#" activeClassName="active">About</NavLink></li>
      </ul>
    );

    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper container">
            <NavLink to="/dashboard" className="brand-logo"id="brand">
            POSTIT!!
            </NavLink>
            <NavLink to="#" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </NavLink>
            { isAuthenticated ? userLinks : guestLinks }
            { isAuthenticated ? sideNavUsers : sideNavGuests }
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  setAuthToken: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  setAuthToken: state.setAuthToken
});

export default connect(mapStateToProps, { logout })(Navbar);
