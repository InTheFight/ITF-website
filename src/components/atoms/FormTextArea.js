import React from 'react';
import PropTypes from 'prop-types';
import {
  TextArea,
  Label,
} from '../../styles/form-styles';

const FormTextArea = ({ children, setField, name, rows, required }) => (
  <li>
    <Label>
      {children}
      <TextArea rows={rows} name={name} onChange={setField} required={required} />
    </Label>
  </li>
);

FormTextArea.defaultProps = {
  required: true,
  rows: 10,
};

export default FormTextArea;
FormTextArea.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  setField: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
};
