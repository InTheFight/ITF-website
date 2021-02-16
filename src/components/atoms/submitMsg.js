import React from 'react';
import PropTypes from 'prop-types';
import {
    FormSubmitMsg,
    FormPresubmit
} from '../../styles/form-styles';

const SubmitMsg = ({ submitted, msg }) => {
  return (submitted ? <FormSubmitMsg>{msg}</FormSubmitMsg> : <FormPresubmit/>);
}

export default SubmitMsg;
SubmitMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};
