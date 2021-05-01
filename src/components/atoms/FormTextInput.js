import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
} from '../../styles/form-styles';

const FormTextInput = ({ label, setField, name, required }) => (
  <li>
    <Label>
      <div>{label}</div>
      <Input type="text" name={name} onChange={setField} required={required} />
    </Label>
  </li>
);

FormTextInput.defaultProps = {
  required: true,
};

export default FormTextInput;

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool, // required is not required! Defaults to true
  setField: PropTypes.func.isRequired,
};
