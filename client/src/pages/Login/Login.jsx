import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx'

export default class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className=" col-lg-9 col-sm-12 col-md-6">
            <h1>Welcome to <span className="brand" id="top">POSTIT!!</span></h1>
            <h5>Connect to friends and loved ones all it takes is a click!!! Login to get started</h5>
            <p id="signup">Don't have an account? Click <Link to="signup">here to Register</Link></p>
          </div>
          <form action="./board.html" method="POST">
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email: </label>
              <input type="email" name="email" className="form-control" placeholder="name@email.com" required />
            </div><br />
            <div className="form-group">
              <label htmlFor="passwword">Password: </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="..........."
              />
            </div>
            <button type="submit" className="form-control btn btn-login btn-primary">Login</button>
            <br />
            <p><a href="#"> Forgot password?</a></p>
          </form>
        </div>
      </div>
    );
  }
}
