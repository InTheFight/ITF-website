import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
} from '../../styles/form-styles';

const FormTextInput = ({ label, setField, name }) => (
  <Label>
    <div>{label}</div>
    <Input type="text" name={name} onChange={setField} />
  </Label>
);

export default FormTextInput;

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
};
