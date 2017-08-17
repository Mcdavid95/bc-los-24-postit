import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx';
import Message from '../../containers/Message';

export default class Board extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col s12 m4 l3">
            <ul id="slide-out" className="side-nav fixed">
              <li><a className="waves-effect waves-light btn modal-trigger" href="#modal1">Create New Group</a></li>
              <li><a href="#!">First Sidebar Link</a></li>
              <li><a href="#!">Second Sidebar Link</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
          </div>
        </div>

        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <button type="button" className="waves-effect waves-light btn modal-close" data-dismiss="modal">&times;</button>
            <h1>Create New Group</h1>
            <form action="/groups" method="POST" autoComplete="on">
              <div className="input-field">
                <label htmlFor="author" className="control-label">Author</label>
                <input type="text" name="group[author]" className="form-control" id="author" placeholder="Enter Author's name" />
              </div>
              <div className="input-field">
                <label htmlFor="title" className="control-label">Group Name</label>
                <input type="text" name="group[title]" className="form-control" id="title" placeholder="Enter title" />
              </div>
              <div className="input-field">
                <label htmlFor="image" className="control-label" id="image">Image</label>
                <input type="url" name="group[image]" placeholder="http://domain.com/your_image.png" />
              </div>
              <div className="input-field">
                <textarea id="textarea1" className="materialize-textarea" placeholder="Purpose for creating this group" />
                <label htmlFor="textarea1">Description</label>
              </div>
              <div className="input-field">
                <select multiple>
                  <option value="" disabled selected>Choose your option</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
                <label>Add Members</label>
              </div>
              <div className="input-field">
                <label htmlFor="submit" className="control-label" />
                <button type="submit" className="btn waves-effect waves-light" name="action">Submit</button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
          </div>
        </div>
        <Message className="bottom"/>
      </div>
    );
  }
}
