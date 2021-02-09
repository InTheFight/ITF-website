import React from 'react';
import PropTypes from 'prop-types';
import {
  TextArea,
  Label,
} from '../../styles/form-styles';

const FormTextArea = ({ children, setField, name, rows }) => (
  <Label>
    {children}
    <TextArea rows={ rows ? rows : 10 } name={name} onChange={setField} />
  </Label>
);

export default FormTextArea;
FormTextArea.propTypes = {
  children: PropTypes.node.isRequired,
  setField: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
