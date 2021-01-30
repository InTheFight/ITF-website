import React from 'react';
import {
  TextArea,
  Label,
} from '../../styles/form-styles';

const FormTextArea = ({ children, setField, name }) => (
  <Label>
    {children}
    <TextArea rows="10" name={name} onChange={setField} />
  </Label>
);

export default FormTextArea;
