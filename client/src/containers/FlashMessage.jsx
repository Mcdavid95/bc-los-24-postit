import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
/**
 * @class
 */
export default class FlashMessage extends Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        type: 'error' ? Materialize.toast(text, 5000, 'red') : Materialize.toast(text, 5000, 'green')
      })}
       />
    );
  }
}
FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};
