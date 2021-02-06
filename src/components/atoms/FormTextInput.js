import React from 'react';
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
