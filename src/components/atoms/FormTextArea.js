import React from 'react';
import PropTypes from 'prop-types';
import {
  TextArea,
  Label,
} from '../../styles/form-styles';

const FormTextArea = ({ children, setField, name, rows }) => (
  <li>
    <Label>
      {children}
      <TextArea rows={rows || 10} name={name} onChange={setField} />
    </Label>
  </li>
);

export default FormTextArea;
FormTextArea.propTypes = {
  children: PropTypes.node.isRequired,
  setField: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};
