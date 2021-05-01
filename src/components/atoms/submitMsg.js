import React from 'react';
import PropTypes from 'prop-types';
import {
  FormSubmitMsg,
  FormTroubleMsg,
  FormPresubmit,
} from '../../styles/form-styles';

const SubmitMsg = ({ submitted, successMsg, errMsg, pendingMsg }) => {
  if (submitted.status === 'trouble') {
    return <FormTroubleMsg>{errMsg}</FormTroubleMsg>;
  } if (submitted.status === 'pending') {
    return <FormSubmitMsg>{pendingMsg}</FormSubmitMsg>;
  } if (submitted.status === 'submitted') {
    return <FormSubmitMsg>{successMsg}</FormSubmitMsg>;
  }
  return <FormPresubmit />;
};

export default SubmitMsg;

SubmitMsg.propTypes = {
  successMsg: PropTypes.string.isRequired,
  pendingMsg: PropTypes.string.isRequired,
  errMsg: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};
