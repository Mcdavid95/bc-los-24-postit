
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import initialState from '../initialState';
import { postMessageRequest, getGroupMessages } from '../actions';
/**
  * @class MessageForm
  * @extends React.Component
  */
export class MessageForm extends Component {
  /**
   * @constructor
   * @description Creates Instance of MessageForm
   * @param {*} props 
   * @memberOf MessageForm
   */
  constructor(props) {
    super(props);
    this.state = {
      message: initialState.postMessage.message,
      priority: initialState.postMessage.priority
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  /**
   * @method onChange
   * @param {Event} event 
   * @return {state} sets state of button
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value

    });
  }

  /**
   * @method onSubmit
   * @param {Event} event 
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.postMessageRequest(this.props.groupId, this.state)
      .then(() => {
        this.setState({
          message: initialState.postMessage.message,
          priority: initialState.postMessage.priority
        });
        this.props.getGroupMessages(this.props.groupId);
      });
  }

  /**
   * @method handleSelectChange
   * @param {Event} event 
   * @return {state} sets state of button
   */
  handleSelectChange(event) {
    this.setState({ priority: event.target.value });
  }
  /**
   * @return{DOM} Dom component
   */
  render() {
    return (
      <div className="container">
        <div className="row message-input">
          <form className="col s12" id="message" onSubmit={this.onSubmit}>
            <div className="row message-form">
              <div className="input-field col s12 m6" id="message-input">
                <label htmlFor="message" className="control-label">Message: </label>
                <textarea
                  name="message"
                  id="message"
                  value={this.state.message}
                  required
                  className="form-control materialize-textarea"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s7 m6 select-dropdown">
                <select
                  value={this.state.priority}
                  id="options"
                  className="browser-default"
                  onChange={this.handleSelectChange}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <button type="submit" className="btn-small right teal btn-floating">
                <i className="small material-icons">send</i>
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }
}

MessageForm.propTypes = {
  groupId: PropTypes.string.isRequired,
  postMessageRequest: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired
};

export default connect(null, { postMessageRequest, getGroupMessages })(MessageForm);
