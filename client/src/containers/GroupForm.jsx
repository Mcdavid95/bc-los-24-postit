import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../initialState';
import { createGroupRequest } from '../actions';
/**
 * @class GroupForm
 * @extends React.Component
 */
export class GroupForm extends Component {
  /**
   * Creates Instance of GroupForm
   * @param {Object} props 
   * @memberOf GrouForm
   */
  constructor(props) {
    super(props);
    this.state = initialState.group;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {Event} event 
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description makes API call to create group
   * @param {Event} event 
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createGroupRequest(this.state);
  }

  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="group-form">
          <div className="input-field">
            <label htmlFor="title" className="control-label">Group Name</label>
            <input
              type="text"
              name="GroupName"
              className="form-control"
              value={this.state.GroupName}
              placeholder="Enter title"
              required
              onChange={this.onChange}
            />
          </div>
          <div className="input-field">
            <textarea
              value={this.state.description}
              name="description"
              type="text"
              className="materialize-textarea"
              placeholder="Purpose for creating this group"
              onChange={this.onChange}
            />
            <label htmlFor="textarea1">Description</label>
          </div>
          <div className="input-field">
            <label htmlFor="submit" className="control-label" />
            <button
              type="submit"
              className="btn waves-effect waves-light modal-action modal-close"
            >Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

GroupForm.propTypes = {
  createGroupRequest: PropTypes.func.isRequired

};


export default connect(null, { createGroupRequest })(GroupForm);
