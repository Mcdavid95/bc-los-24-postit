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
   * @return {Object} DOM Object
   */
  render() {
    console.log('====>', this.props.groupMessages);
    return (
      <div>
        <div id="message-board">
          <ul className="row">
            {this.state.messages.map(message =>
              (<li key={message.id} className="message-content">
                <span id="sender-name">{message.username}</span>
                <span className="message-content">{message.message}</span>
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
