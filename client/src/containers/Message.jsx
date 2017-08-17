import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12 center">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">mode_edit</i>
                <textarea id="icon_prefix2" className="materialize-textarea" />
                <label htmlFor="icon_prefix2">First Name</label>
              </div>
              <button type="submit" className="btn-floating btn-large waves-effect waves-light teal lighten-2"><i className="material-icons"></i> href="#">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
