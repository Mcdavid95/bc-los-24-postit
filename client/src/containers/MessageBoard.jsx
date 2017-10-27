import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import history from '../utils/History';
import { getGroupMessages } from '../actions';
import handlePriority from '../utils/handlePriority';


/**
 * @class MessageBoard
 * @extends React.Component
 */
export class MessageBoard extends Component {
  /**
   * Creates Instance of MessageBoard
   * @param {*} props 
   * @memberOf MessageBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.groupMessages
    };
    this.handlePriority = handlePriority.bind(this);
    this.dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
  }
  /**
 * @description updates state when props changes
 * @param {Object} nextProps 
 * @returns {Object} new state
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
    return (
      <div className="container">
        <div id="message-board">
          <ul className="row" id="message-list">
            {this.state.messages.length === 0 ? (<h3>You have no messages in this Group</h3>) :
              this.state.messages.map(message =>
                (<li key={message.id} className="message-content">
                  <div className="message-card container">
                    <em><span className="username">  @{message.username} </span></em>
                    <small>
                      <span className="priority">{this.handlePriority(message.priority)}</span>
                    </small>
                    <small><span className="createdAt"> sent: {new Date(message.createdAt).toLocaleString('en-us', this.dateOptions)}</span></small>
                    <br />
                    <p>
                      <strong>
                        <span className="center-align" id="message-content">
                          {message.message}
                        </span>
                      </strong>
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

export default connect(mapStateToProps, { getGroupMessages })(MessageBoard);
