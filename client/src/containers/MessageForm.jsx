import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import initialState from '../initialState';
import postMessagesRequest from '../actions/postMessageAction';
import messages from '../actions/getMessagesActions';
/**
  * 
  */
class MessageForm extends Component {
  /**
   * 
   * @param {*} props 
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
   * 
   * @param {Event} e 
   * @return {state} sets state of button
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    });
  }

  /**
   * 
   * @param {Event} e 
   * @return {state} updates state
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.postMessagesRequest(this.props.groupId, this.state)
      .then(() => {
        this.setState({
          message: initialState.postMessage.message,
          priority: initialState.postMessage.priority
        });
        this.props.messages(this.props.groupId);
      });
  }

  /**
   * 
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
    console.log(this.state);
    return (
      <div>
        <form className="col s12" id="message" onSubmit={this.onSubmit}>
          <div>
            <div className="input-field col s12">
              <label htmlFor="message" className="control-label">Message: </label>
              <input
                name="message"
                type="text"
                id="message"
                value={this.state.message}
                required
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="input-field col m4 select-dropdown">
              <select value={this.state.priority} className="browser-default" onChange={this.handleSelectChange}>
                <option value="">Chose your Priority</option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-small right teal btn-floating">
            <i className="small material-icons">send</i>
          </button>
        </form>

      </div>
    );
  }
}

MessageForm.propTypes = {
  groupId: PropTypes.string.isRequired,
  postMessagesRequest: PropTypes.func.isRequired,
  messages: PropTypes.func.isRequired
};

export default connect(null, { postMessagesRequest, messages })(MessageForm);
