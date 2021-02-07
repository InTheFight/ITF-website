import styled from 'styled-components';

// TODO: Required form elements
// TODO: Identify required?
// TODO: Show/hide incumbent when applicable (etc)?
export const Form = styled.form`
  color: '#2C358F';
  display: flex;
  flex-direction: column;
  font-size: 30px;
  margin: 40px 0px 0px 95px;

  & div {
    width: 500px;
    margin-bottom: 5px;
  }
`;

export const QuestionnaireTitle = styled.h1`
  margin-left: 92px;
  font-family: DIN Condensed;
  font-weight: bold;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
`;

export const EndorsementIntro = styled.section`
  font-family: DIN Condensed;
  width: 800px;
  margin: 40px 0px 0px 92px;
`;

export const Input = styled.input`
  font-size: large;
  height: 27px;
  width: 600px;
`;

export const NumberInput = styled.input`
  font-size: large;
  height: 27px;
  width: 600px;
  -moz-appearance: textfield;
`;

export const TextArea = styled.textarea`
  font-size: large;
  width: 600px;
`;

export const Label = styled.label`
  display: flex;
  font-size: medium;
  flex-direction: column;
  margin: 10px 0 10px 0;
`;

export const FormButtonContainer = styled.div`
  margin-top: inherit;

  & input {
    width: 615px !important;
  }
`;

export const Select = styled.select`
  font-size: medium;
  width 360px;
`;

export const VirtualText = styled.p`
  font-weight: bold;
  margin: 10px;
`;

export const CheckboxLabel = styled.label`
  font-size: small;
  margin: 10px 40px 10px 0;
`;

export const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin-left: 15px;
  width: 520px !important;
`;

export const Checkbox = styled.input`
  font-size: medium;
  margin-left: 10px;
`;

export const Checkboxes = styled.fieldset`
  display: flex
  flex-direction: row;
  width: 600px;
  border: none;
  margin-left: -25px;
  margin-top: 20px;
`;

export const Legend = styled.legend`
  font-size: medium;
  margin: 10px 40px 10px 0;
`;

export const RadioLabelYes = styled.label`
  display: flex
  flex-direction: row;
`;
export const RadioLabelNo = styled.label`
  display: flex
  flex-direction: row;
  margin-left: 20px;
`;
export const RadioInput = styled.input`
  width: 20px;
`;
