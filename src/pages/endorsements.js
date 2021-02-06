import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

import { createClient } from 'contentful-management';
import Layout from '../components/templates/layout';
import Button from '../components/atoms/button';
import LinesSought from '../components/molecules/LinesSought';
import Bool from '../components/molecules/Bool';
import FormTextInput from '../components/atoms/FormTextInput';
import FormTextArea from '../components/atoms/FormTextArea';

import {
  Form,
  QuestionnaireTitle,
  Input,
  NumberInput,
  Label,
  FormButtonContainer,
  Select,
} from '../styles/form-styles';

const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            tokens {
              accessToken
              spaceId
              apiKey
            }
          }
        }
      }
    `)

const parties = { Democratic: 'Democratic',
  Republican: 'Republican',
  Conservative: 'Conservative',
  Independence: 'Independence',
  Green: 'Green',
  Libertarian: 'Libertarian',
  SAM: 'SAM',
  Working_Families_Party: 'Working Families Party',
  Other: 'Other',
};

// Modify a simple key-value mapping into the format Contentful needs
function contentfulize(obj) {
  const result = {
    linesSought: {
      'en-US': {
        parties: [],
      },
    },
  };

  Object.entries(obj).map(([k, v]) => {
    const skipReformat = ['incumbent', 'challenger'];
    const partyFields = Object.keys(parties);
    if (skipReformat.includes(k)) {
      const field = Object.fromEntries([[k, { 'en-US': v }]]);
      Object.assign(result, field);
    } else if (partyFields.includes(k)) {
      if (v == 'on') {
        result.linesSought['en-US'].parties.push(k);
      }
    } else { // Text fields
      const field = Object.fromEntries([[k, { 'en-US': v }]]);
      Object.assign(result, field);
    }
  });
  return { fields: result };
}

const Endorsements = () => {
  const [questionnaire, setQuestionnaire] = useState({});

  const client = createClient({
    accessToken: data.site.siteMetadata.tokens.accessToken
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    client.getSpace(data.site.siteMetadata.tokens.spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createEntry('candidateQuestionnaires', contentfulize(questionnaire)))
      .then((entry) => console.log(entry))
      .catch(console.error);
    e.target.reset();
  };

  const setField = (event) => {
    const { name, value } = event.target;

    if (name === 'linesSought') {

    } else if (name === 'incumbent' || name === 'challenger') {
      const fieldVal = Object.fromEntries([[name, value === 'yes']]);
      setQuestionnaire(Object.assign(questionnaire, fieldVal));
    } else {
      const fieldVal = Object.fromEntries([[name, value]]);
      setQuestionnaire(Object.assign(questionnaire, fieldVal));
    }
  };

  return (
    <Layout>
      <QuestionnaireTitle>Endorsement Questionnaire</QuestionnaireTitle>
      <Form onSubmit={handleSubmit}>
        <FormTextInput
          label="Candidate's Full Name"
          name="fullName"
          setField={setField}
        />
        <FormTextInput
          label="Candidate's Pronouns"
          name="pronouns"
          setField={setField}
        />
        <Label>
          <div>Election / Primary Date</div>
          <Input type="date" name="electionDate" onChange={setField} />
        </Label>
        <FormTextInput
          label="Current Office / Occupation"
          name="occupation"
          setField={setField}
        />
        <FormTextInput
          label="Preferred Campaign Point of Contact (Name)"
          name="contactName"
          setField={setField}
        />
        <FormTextInput
          label="Preferred Campaign Point of Contact (Role)"
          name="contactRole"
          setField={setField}
        />
        <Label>
          <div>Preferred Campaign Point of Contact (Email)</div>
          <Input type="email" name="email" onChange={setField} />
        </Label>
        <Label>
          <div>Preferred Campaign Point of Contact (Phone Number)</div>
          <Input type="tel" name="phone" onChange={setField} />
        </Label>
        <Label>
          <div>In which political party are you currently registered?</div>
          <Select onChange={setField} name="party">
            <option selected="selected">Select a party</option>
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
        <FormTextInput
          label="Name of Your Campaign Committee"
          name="committee"
          setField={setField}
        />
        <FormTextInput
          label="Campaign Address"
          name="campaignAddress"
          setField={setField}
        />
        <FormTextInput
          label="Campaign Zip"
          name="campaignZip"
          setField={setField}
        />
        <Label>
          <div>Campaign Website</div>
          <Input type="url" name="website" onChange={setField} />
        </Label>
        <FormTextInput
          label="Campaign Facebook"
          name="facebook"
          setField={setField}
        />
        <FormTextInput
          label="Campaign Twitter"
          name="twitter"
          setField={setField}
        />
        {/* TODO: make a list-able thing. Maybe should allow multiple? */}
        <FormTextInput
          label="Other campaign social media accounts (please list)"
          name="socialMedia"
          setField={setField}
        />
        <FormTextInput
          label="Name of Office you are seeking"
          name="office"
          setField={setField}
        />
        <Label>
          <div>District Number, if applicable</div>
          <NumberInput type="number" name="districtNumber" onChange={setField} />
        </Label>
        {/* TODO: Add the additional text. Does it fight in a label, or do we need a separate note? */}
        <LinesSought
          legend='Check all of the party lines you are seeking, including any "non-official party lines"'
          setField={setField}
          parties={parties}
        />
        {/* TODO: yes/no radio */}
        <Label>
          <div>Are you an incumbent?</div>
          <Bool name="incumbent" setField={setField} />
        </Label>
        <Label>
          <div>Are you challenging an incumbent?</div>
          <Bool name="challenger" setField={setField} />
        </Label>
        <FormTextInput
          label="Name of incumbent (if applicable)"
          name="incumbentName"
          setField={setField}
        />
        <FormTextInput
          label="Name of primary opponent(s) if applicable"
          name="primaryOpponents"
          setField={setField}
        />
        <FormTextInput
          label="Name of general election opponent(s) if applicable/known"
          name="generalOpponents"
          setField={setField}
        />
        <FormTextArea setField={setField} name="vision">
          <div>
            <p>Tell us about who you are and why you are running. Include your core values and vision.</p>
            <p>What are the biggest challenges facing the district you hope to repersent? What needs to happen for those to be resolved?</p>
          </div>
        </FormTextArea>
        <FormTextArea setField={setField} name="engagement">
          <div>How will you engage with diverse groups across the district you hope to represent? Religious, ethnic, immigration status, helth status, LGBTQIA+, etc.</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="priorRuns">
          <div>Have you run for office previously? If so, please provide details.</div>
        </FormTextArea>
        {/* TODO: Make list */}
        <FormTextArea setField={setField} name="endorsements">
          <div>Please list other endorsements you have earned, especially from unions, progressive organizations, and progressive elected officials.</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="orgs">
          <div>
            What civic and political organizations are you involved with in the city?

            If we called them up, what would they tell us about you?
          </div>
        </FormTextArea>
        <FormTextArea setField={setField} name="friends">
          <div>What would your best friends say about you?</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="strength">
          <div>What is your greatest strength and greatest weakness as a candidate?</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="priorities">
          <div>What are your top 3 priorities or policies you hope to accomplish in this term of office? Please be realistic about the scope of the office.</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="itfLove">
          <div>Why do you want In The Fight NBK's endorsement?</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="itfMembers">
          <div>Were you referred to In The Fight NBK by any of our members? (here is where you name drop!)</div>
        </FormTextArea>
        <FormTextArea setField={setField} name="justice">
          <div>
            <p>
              Are you committed to fighting for a society built on true racial,
              economic and gender justice and equity?
            </p>
            <p>Please provide examples showing this work.</p>
          </div>
        </FormTextArea>
        <FormButtonContainer>
          <Button text="Submit" color="purple" />
        </FormButtonContainer>
      </Form>
    </Layout>
  );
};

Endorsements.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Endorsements;
