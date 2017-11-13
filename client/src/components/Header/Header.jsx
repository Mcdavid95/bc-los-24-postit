import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './Navbar';

const Header = props => (
  <header>
    <NavBar groupId={props.groupId} />
  </header>
);

Header.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default Header;
