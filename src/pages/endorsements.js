import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Title from '../components/atoms/title';
import Layout from '../components/templates/layout';
import Button from '../components/atoms/button';
import FormElement from '../components/organisms/FormElement';

import {
  Form,
  QuestionnaireTitle,
  Input,
  TextArea,
  Label,
  ButtonContainer,
  Other,
  Select,
  VirtualText,
  CheckboxLabel,
  Checkbox,
  Checkboxes,
  Legend
} from '../styles/form-styles';
import { createClient } from 'contentful-management'

const parties =
      { Democratic: "Democratic",
        Republican: "Republican",
        Conservative: "Conservative",
        Independence: "Independence",
        Green: "Green",
        Libertarian: "Libertarian",
        SAM: "SAM",
        Working_Families_Party: "Working Families Party",
        Other: "Other",
      }

const LinesSought = ({ legend, setField }) => {
  return (
    <Checkboxes>
      <Legend>{legend}</Legend>
      {Object.entries(parties).map(([k,v]) =>
            <CheckboxLabel>
              <span>{v}</span>
              <Checkbox type="checkbox" name={k} onChange={setField} />
            </CheckboxLabel>)}
    </Checkboxes>
  )
}

// Modify a simple key-value mapping into the format Contentful needs
function contentfulize(obj) {

  const result = {}

  Object.entries(obj).map(([k,v]) => {
    if (k === 'noneyet') {

    } else { // Text fields
      const field = Object.fromEntries([[k,{'en-US': v}]])
      Object.assign(result, field)
    }
  })

  return {fields: result}
}

const Endorsements = () => {
  const [questionnaire, setQuestionnaire] = useState({})

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_KEY,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    debugger
    client.getSpace(process.env.SPACE_ID)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.createEntry('candidateQuestionnaires', contentfulize(questionnaire)))
    .then((entry) => console.log(entry))
    .catch(console.error)
   }

  const setField = (event) => {
    const {name, value } = event.target

    const fieldVal = Object.fromEntries([[name, value]])

    if (name === 'linesSought') {

    } else {
        setQuestionnaire(Object.assign(questionnaire, fieldVal))
    }

    // } else if (Object.keys(parties).includes(name)) {
    //   // setLinesSought(Object.assign(k:v))
    // }
  }

  return (
    <Layout>
      <Title text="Endorsement Questionnaire"></Title>
      <Form onSubmit={handleSubmit}>
        <FormElement
          label="Candidate's Full Name"
          name="fullName"
          setField={setField}
        />
        <Label>
          <div>Candidate's Pronouns</div>
          <Input type="text" name="pronouns" onChange={setField} />
        </Label>
        <Label>
          <div>Election / Primary Date</div>
          <Input type="date" name="electionDate" onChange={setField} />
        </Label>
        <Label>
          <div>Current Office / Occupation</div>
          <Input type="text" name="occupation" onChange={setField} />
        </Label>
        <Label>
          <div>Preferred Campaign Point of Contact (Name)</div>
          <Input type="text" name="contactName" onChange={setField} />
        </Label>
        <Label>
          <div>Preferred Campaign Point of Contact (Role)</div>
          <Input type="text" name="contactRole" onChange={setField} />
        </Label>
        <Label>
          <div>Preferred Campaign Point of Contact (Email)</div>
          <Input type="email" name="email" onChange={setField} />
        </Label>
        <Label>
          <div>Preferred Campaign Point of Contact (Phone Number)</div>
          <Input type="tel" name="phone" onChange={setField} />
        </Label>
        {/* TODO: make this a select list  */}
        <Label>
          <div>In which political party are you currently registered?</div>
          <Select name="party">
            <option value="Democratic">Democratic</option>
            <option value="Republican">Republican</option>
            <option value="Conservative">Conservative</option>
            <option value="Independence">Independence</option>
            <option value="Green">Green</option>
            <option value="Libertarian">Libertarian</option>
            <option value="SAM">SAM</option>
            <option value="Working_Families_Party">Working Families Party</option>
            <option value="Other">Other</option>
          </Select>
        </Label>
        <Label>
          <div>Name of Your Campaign Commitee</div>
          <Input type="text" name="committee" onChange={setField} />
        </Label>
        <Label>
          <div>Campaign Address</div>
          <Input type="text" name="campaignAddress" onChange={setField} />
        </Label>
        <Label>
          <div>Campaign Zip</div>
          <Input type="text" name="campaignZip" onChange={setField} />
        </Label>
        <Label>
          <div>Campaign Website</div>
          <Input type="url" name="website" onChange={setField} />
        </Label>
        <Label>
          <div>Campaign Facebook</div>
          <Input type="text" name="facebook" onChange={setField} />
        </Label>
        <Label>
          <div>Campaign Twitter</div>
          <Input type="text" name="twitter" onChange={setField} />
        </Label>
        {/* TODO: make a list-able thing. Maybe should allow multiple?*/}
        <Label>
          <div>Other campaign social media accounts (please list)</div>
          <Input type="text" name="socialMedia" onChange={setField} />
        </Label>
        <Label>
          <div>Name of Office you are seeking</div>
          <Input type="text" name="office" onChange={setField} />
        </Label>
        <Label>
          <div>District Number, if applicable</div>
          <Input type="number" name="districtNumber" onChange={setField} />
        </Label>
        {/* TODO: Add the additional text. Does it fight in a label, or do we need a separate note? */}
        <LinesSought
          legend='Check all of the party lines you are seeking, including any "non-official party lines"'
          setField={setField}
        />
        {/* TODO: yes/no radio */}
        <Label>
          <div>Are you an incumbent?</div>
          <Input type="boolean" name="incumbent" onChange={setField} />
        </Label>
        <Label>
          <div>Are you challenging an incumbent?</div>
          <Input type="boolean" name="challenger" onChange={setField} />
        </Label>
        <Label>
          <div>Name of incumbent (if applicable)</div>
          <Input type="text" name="incumbentName" onChange={setField} />
        </Label>
        <Label>
          <div>Name of primary opponent(s) if applicable </div>
          <Input type="text" name="primaryOpponents" onChange={setField} />
        </Label>
        <Label>
          <div>Name of general election opponent(s) if applicable/known</div>
          <Input type="text" name="generalOpponents" onChange={setField} />
        </Label>
        <Label>
          <div>
            <p>Tell us about who you are and why you are running. Include your core values and vision.</p>
            <p>What are the biggest challenges facing the district you hope to repersent? What needs to happen for those to be resolved?</p>
          </div>
          <TextArea rows="10" name="vision" onChange={setField} />
        </Label>
        <Label>
          <div>How will you engage with diverse groups across the district you hope to represent? Religious, ethnic, immigration status, helth status, LGBTQIA+, etc.</div>
          <TextArea rows="10" name="engagement" onChange={setField} />
        </Label>
        <Label>
          <div>Have you run for office previously? If so, please provide details.</div>
          <TextArea rows="5" name="priorRuns" onChange={setField} />
        </Label>
        {/* TODO: Make list */}
        <Label>
          <div>Please list other endorsements you have earned, especially from unions, progressive organizations, and progressive elected officials.</div>
          <TextArea rows="5" name="endorsement" onChange={setField} />
        </Label>
        <Label>
          <div>What civic and political organizations are you involved with in the city?

          If we called them up, what would they tell us about you?</div>
          <TextArea rows="10" name="orgs" onChange={setField} />
        </Label>
        <Label>
          <div>What would your best friends say about you?</div>
          <TextArea rows="10" name="friends" onChange={setField} />
        </Label>
        <Label>
          <div>What is your greatest strength and greatest weakness as a candidate?</div>
          <TextArea rows="10" name="strength" onChange={setField} />
        </Label>
        <Label>
          <div>What are your top 3 priorities or policies you hope to accomplish in this term of office? Please be realistic about the scope of the office.</div>
          <TextArea rows="10" name="priorities" onChange={setField} />
        </Label>
        <Label>
          <div>Why do you want In The Fight NBK's endorsement?</div>
          <TextArea rows="10" name="itflovel" onChange={setField} />
        </Label>
        <Label>
          <div>Were you referred to In The Fight NBK by any of our members? (here is where you name drop!)</div>
          <TextArea rows="5" name="itfMembers" onChange={setField} />
        </Label>
        <Label>
          <div>
            <p>Are you committed to fighting for a society built on true racial,
               economic and gender justice and equity?</p>
            <p>Please provide examples showing this work.</p>
          </div>
          <TextArea rows="10" name="justice" onChange={setField} />
        </Label>
        <ButtonContainer>
          <Button text="Submit" color="purple" />
        </ButtonContainer>
      </Form>
    </Layout>
  );
};

Endorsements.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Endorsements;
