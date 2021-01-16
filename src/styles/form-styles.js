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
  margin: 1em 0 0 100px;
  text-align: center;
`
export const Input = styled.input`
  font-size: large;
  height: 27px;
  width: 600px;
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

export const ButtonContainer = styled.div`
  margin-top: inherit;

  & input {
    margin-left: 110px;
    width: 500px !important;
  }
`;

export const Other = (selected) => {

}

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

export const Checkbox = styled.input`
  font-size: medium;
  margin-left: 10px;
`;

export const Checkboxes = styled.fieldset`
  display: flex
  flex-direction: row;
`

export const Legend = styled.legend`
  font-size: medium;
  margin: 10px 40px 10px 0;
`