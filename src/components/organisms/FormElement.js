import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  Label
} from '../../styles/form-styles';

const FormElement = ({label, name, setField }) => {
  return (
    <Label>
      <div>{label}</div>
      <Input type="text" name={name} onChange={setField} />
    </Label>
  )
}

export default FormElement;