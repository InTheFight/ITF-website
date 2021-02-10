import React from 'react';
import PropTypes from 'prop-types';

import {
  CheckboxLabel,
  Checkbox,
  Checkboxes,
  CheckboxContainer,
  Legend,
} from '../../styles/form-styles';

const LinesSought = ({ legend, setField, parties }) => (
  <li>
    <Checkboxes>
      <Legend>{legend}</Legend>
      <CheckboxContainer>
        {Object.entries(parties).map(([k, v]) => (
          <CheckboxLabel>
            <span>{v}</span>
            <Checkbox type="checkbox" name={k} onChange={setField} />
          </CheckboxLabel>
        ))}
      </CheckboxContainer>
    </Checkboxes>
  </li>
);

export default LinesSought;

LinesSought.propTypes = {
  legend: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  /* eslint-disable react/forbid-prop-types */
  parties: PropTypes.object.isRequired,
  /* eslint-disable react/forbid-prop-types */
};
