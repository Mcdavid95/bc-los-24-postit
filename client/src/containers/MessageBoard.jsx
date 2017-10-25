import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import history from '../utils/History';
import getMessages from '../actions/getMessagesActions';


/**
 * @class
 */
class MessageBoard extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.groupMessages
    };
    this.handlePriority = this.handlePriority.bind(this);
  }
  /**
 * 
 * @param {Array} nextProps 
 * @returns {Array} new state
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.groupMessages.length === 1) {
      this.setState({
        messages: nextProps.groupMessages[0]
      });
      history.push(`/group/${this.props.groupId}/messages`);
    } else {
      this.setState({
        messages: nextProps.groupMessages[nextProps.groupMessages.length - 1]
      });
      history.push(`/group/${this.props.groupId}/messages`);
    }
  }
  /**
   * 
   * @param {*} priority 
   * @return {DOM} DOM
   */
  handlePriority(priority) {
    if (priority === 'normal') {
      return (
        <span className="normal">{priority}</span>
      );
    } else if (priority === 'urgent') {
      return (
        <span className="urgent">{priority}</span>
      );
    }
    return (
      <span className="critical">{priority}</span>
    );
  }
  /**
   * @return {Object} DOM Object
   */
  render() {
    return (
      <div>
        <div id="message-board">
          <ul className="row">
            {this.state.messages.map(message =>
              (<li key={message.id} className="message-content">
                <div className="message-card">
                  <em><span className="username">  @{message.username} </span></em>
                  {this.handlePriority(message.priority)}
                  <br />
                  <p>
                    <span className="center-align" id="messsage-content">{message.message}  </span>
                  </p>
                </div>
              </li>)
            )}
          </ul>
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  groupMessages: Proptypes.array.isRequired,
  groupId: Proptypes.string.isRequired
};

const mapStateToProps = state => ({
  groupMessages: state.groupMessages
});

export default connect(mapStateToProps, { getMessages })(MessageBoard);
