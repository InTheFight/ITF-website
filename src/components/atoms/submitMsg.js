import React from 'react';
import PropTypes from 'prop-types';
import {
  FormSubmitMsg,
  FormTroubleMsg,
  FormPresubmit,
} from '../../styles/form-styles';

const SubmitMsg = ({ submitted, msg, errMsg }) => {
  if (submitted.status === 'trouble') {
    return <FormTroubleMsg>{errMsg}</FormTroubleMsg>;
  } if (submitted.status === 'submitted') {
    return <FormSubmitMsg>{msg}</FormSubmitMsg>;
  }
  return <FormPresubmit />;
};

export default SubmitMsg;

SubmitMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};
