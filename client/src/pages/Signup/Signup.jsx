import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <main>
          <div className="container" id="content">
            <div className="row">
              <div className="col s12 m6 l9">
                <h1><span id="acct">Create an Account</span></h1>
              </div>
            </div>

            <form action="login">
              <div className="form-group">
                <label htmlFor="fullname" className="control-label">Full Name:</label>
                <input id="fullname" type="text" className="form-control" placeholder="John" required />
              </div>

              <div className="form-group">
                <label className="control-label" htmlFor="username">User Name:</label>
                <input className="form-control" id="username" type="text" placeholder="Doe" required />
              </div>
              <hr />
              <div className="form-group">
                <label className="control-label" htmlFor="email">Email:</label>
                <input className="form-control" type="email" placeholder="your email" required />
              </div>
              <hr />
              <div className="form-group">
                <label className="control-label" htmlFor="password">Password:</label>
                <input className="form-control" id="password" type="password" placeholder="password" pattern=".{<=8}" required title="Password must be 8 or more" />
                <hr />
                <label htmlFor="password">Comfirm Password:</label>
                <input className="form-control" id="password" type="password" placeholder="password" pattern=".{5,10}" required title="Password must be between 5 and 10 characters" />
              </div>
              <hr />

              <button type="submit" className="btn btn-success" href="#">Submit</button>

            </form>
          </div>
        </main>
      </div>
    );
  }
}
