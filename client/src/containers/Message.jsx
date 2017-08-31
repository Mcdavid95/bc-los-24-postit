import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      // <div className="click-to-toggle">
      //   <a className="btn-floating btn-large red">
      //     <i className="large material-icons">mode_edit</i>
      //   </a>
    // <div>
      <form id="message">
        <div className="input-field">
          <label htmlFor="message" className="control-label">Message: </label>
          <input
            type="text"
            name="message"
            // value="message"
            required
          />
        </div>
        <div>
          <select name="priority">
            <option value="normal" selected>normal</option>
            <option value="urgent">urgent</option>
            <option value="critical">critical</option>
          </select>
        </div>
      </form>
    // </div>
      // </div>
    );
  }
}
