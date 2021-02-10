import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  RadioInput,
  RadioLabelYes,
  RadioLabelNo,
} from '../../styles/form-styles';

const Bool = ({ name, label, setField }) => (
  <li>
    <Label>
      <div>{label}</div>
      <div>
        <RadioLabelYes for={`${name}_yes`}>
          <span>Yes</span>
          <RadioInput type="radio" name={name} id={`${name}_yes`} value="yes" onChange={setField} />
        </RadioLabelYes>
        <RadioLabelNo for={`${name}_no`}>
          <span>No</span>
          <RadioInput type="radio" name={name} if={`${name}_no`} value="no" onChange={setField} />
        </RadioLabelNo>
      </div>
    </Label>
  </li>
);

export default Bool;

Bool.propTypes = {
  setField: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
