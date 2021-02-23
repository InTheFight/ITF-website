import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  RadioInput,
  RadioLabelYes,
  RadioLabelNo,
} from '../../styles/form-styles';

const Bool = ({ name, label, setField, required }) => (
  <li>
    <Label>
      <div>{label}</div>
      <div>
        <RadioLabelYes for={`${name}_yes`}>
          <span>Yes</span>
          <RadioInput
            type="radio"
            name={name}
            id={`${name}_yes`}
            value="yes"
            onChange={setField}
            required={required}
          />
        </RadioLabelYes>
        <RadioLabelNo for={`${name}_no`}>
          <span>No</span>
          <RadioInput
            type="radio"
            name={name}
            id={`${name}_yes`}
            value="yes"
            onChange={setField}
            required={required}
          />
        </RadioLabelNo>
      </div>
    </Label>
  </li>
);

Bool.defaultProps = {
  required: true,
};

export default Bool;

Bool.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  setField: PropTypes.func.isRequired,
};
