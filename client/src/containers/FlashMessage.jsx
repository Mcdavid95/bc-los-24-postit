import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const flash = text => ('error' ? Materialize.toast(text, 5000, 'red') : Materialize.toast(text, 5000, 'green'));

const FlashMessage = (props) => {
  const { type, text } = props.message;
  return (
    <div className={classnames('alert', {
      'alert-success': type === 'success',
      type: flash(text)
    })}
    />
  );
};
FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default FlashMessage;
