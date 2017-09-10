import React, { Component } from 'react';
import Navbar from './Navbar';
import SideNav from '../../pages/sideNav';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Navbar />
      </header>
    );
  }
}
