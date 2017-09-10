import React, { Component } from 'react';

export default class Footer extends Component {
  /**
     * @class
     */
  render() {
    return (
        <footer className="page-footer">
          <div className="footer footer-copyright">
            <div className="container">
            © 2017 Copyright Text
              <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
    );
  }
}
