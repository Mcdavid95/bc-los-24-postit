import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, currentGroup } from '../../actions';
import initialState from '../../initialState';
//
/**
 * @class
 */
export class Navbar extends Component {
/**
 * 
 * @param {*} props 
 */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: initialState.setAuthToken.isAuthenticated,
      group: this.props.groupName
    };
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.props.setAuthToken;
  }
  /**
   * @method ComponentDidMount
   * @description React LifeCycle method
   * @returns {*} any
   */
  componentDidMount() {
    if (this.props.groupId) {
      this.props.currentGroup(this.props.groupId);
    }
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('select').material_select();
      $('.modal').modal();
    });
  }
  /**
 * 
 * @param {boolean} nextProps 
 * @return {boolean} set auth status
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: !nextProps.setAuthToken.isAuthenticated,
      group: nextProps.groupName
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
    const group = (
      <ul
        className="right group-name"
      ><li><NavLink to="#" activeClassName="active">Group: {this.state.group} </NavLink></li></ul>
    );

    const { isAuthenticated } = this.props.setAuthToken;

    const userLinks = (
      <div>
        <NavLink to="#" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/dashboard" activeClassName="active"><i
            className="material-icons tooltipped"
            data-position="bottom"
            data-delay="10"
            data-tooltip="Home"
          >home</i></NavLink></li>
          <li><NavLink to="/login" onClick={this.logout}> <i
            className="material-icons tooltipped"
            data-position="bottom"
            data-delay="10"
            data-tooltip="Logout"
          >exit_to_app</i></NavLink></li>
        </ul>
        <NavLink to="/search-user" className="right" activeClassName="active"><i
          className="material-icons tooltipped"
          data-position="bottom"
          data-delay="10"
          data-tooltip="Search For Other Users"
        >
          search
        </i></NavLink>
        {this.props.groupId !== undefined ? group : null}
      </div>
    );

    const sideNavUsers = (
      <ul className="side-nav" id="mobile-demo">
        <li><NavLink to="/dashboard" activeClassName="active"><i
          className="material-icons tooltipped"
          data-position="right"
          data-delay="10"
          data-tooltip="Home"
        >home</i></NavLink></li>
        <li>
          <NavLink
            to="/login"
            onClick={this.logout}
          ><i className="material-icons">exit_to_app</i></NavLink></li>
      </ul>
    );

    const userLogo = (
      <NavLink to="/dashboard" className="brand-logo"id="brand">
      POSTIT!!
      </NavLink>
    );

    const guestLogo = (
      <span className="brand-logo"id="brand">
      POSTIT!!
      </span>
    );

    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper container">
            { isAuthenticated ? userLogo : guestLogo }
            { isAuthenticated ? userLinks : null }
            { isAuthenticated ? sideNavUsers : null }
          </div>
        </nav>
      </div>
    );
  }
}


const navBarPropTypes = () => {
  const navBar = new Navbar();
  if (navBar.props.groupId) {
    return {
      setAuthToken: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired,
      currentGroup: PropTypes.func.isRequired,
      groupId: PropTypes.string.isRequired,
      groupName: PropTypes.string.isRequired,
    };
  }
  return {
    setAuthToken: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    currentGroup: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
  };
};

Navbar.propTypes = navBarPropTypes;

const mapStateToProps = state => ({
  setAuthToken: state.setAuthToken,
  groupName: state.currentGroup
});

export default connect(mapStateToProps, { logout, currentGroup })(Navbar);
