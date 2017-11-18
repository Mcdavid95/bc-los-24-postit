import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
/**
 * @function PageNotFound
 * @returns {DOM} DOM with 404 page
 */
const PageNotFound = () => (
  <div className="not-found">
    <Header />
    <main>
      <div />
      <div>
        <h5 className="black-text lighten-1 center-align">
          Click on the button below to go back to home page
        </h5>
      </div>
      <div>
        <Link to="/"><button>Home</button></Link>
      </div>
    </main>
  </div>
);

export default PageNotFound;
