import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

class PageNotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <Header />
        <main className="container">
          <div>
            <img src="/client/public/404.jpg"  height="300" width="400" />
          </div>
          <div>
            <p>Click on the button below to go back to home page </p>
          </div>
          <div>
            <Link to="/"><button>Home</button></Link>
          </div>
        </main>
      </div>
    );
  }
}

export default PageNotFound;
