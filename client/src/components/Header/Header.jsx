import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './Navbar';

const Header = props => (
  <header>
    <NavBar groupId={props.groupId} />
  </header>
);

const headerPropTypes = () => {
  if (Header().props.groupId) {
    return {
      groupId: PropTypes.string.isRequired
    };
  }
};

Header.propTypes = headerPropTypes;
export default Header;
