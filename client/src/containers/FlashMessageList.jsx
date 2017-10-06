import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';

const FlashMessageList = (props) => {
  const messages = props.messages.map(message =>
    <FlashMessage key={message.id} message={message} />
  );
  return (
    <div>{messages}</div>
  );
};

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  messages: state.addflashMessages
});

export default connect(mapStateToProps)(FlashMessageList);
