import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/* eslint-disable import/no-unresolved */
import { createClient } from 'contentful-management';
/* eslint-disable import/no-unresolved */

import Layout from '../templates/layout';
import Button from '../components/atoms/button';
import LinesSought from '../components/molecules/LinesSought';
import Bool from '../components/molecules/Bool';
import FormTextInput from '../components/atoms/FormTextInput';
import FormTextArea from '../components/atoms/FormTextArea';
import SubmitMsg from '../components/atoms/submitMsg';
import discard from '../lib/utils';

import {
  EndorsementIntro,
  Form,
  QuestionnaireTitle,
  Input,
  NumberInput,
  Label,
  FormButtonContainer,
  FormNumberedFields,
  Select,
  TextAreaLabelPara,
} from '../styles/form-styles';

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
      if (v === 'on') {
        result.linesSought['en-US'].parties.push(k);
      }
    } else { // Text fields
      const field = Object.fromEntries([[k, { 'en-US': v }]]);
      Object.assign(result, field);
    }
    return {};
  });
  return { fields: result };
}

const Endorsements = () => {
  const [questionnaire, setQuestionnaire] = useState({});
  const [submitted, setSubmitted] = useState({ status: 'unsubmitted' });

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
    `,
  );

  const client = createClient({
    accessToken: data.site.siteMetadata.tokens.apiKey,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    client.getSpace(data.site.siteMetadata.tokens.spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        setSubmitted({ status: 'pending' });
        return environment.createEntry('candidateQuestionnaires', contentfulize(questionnaire));
      })
      .then((res) => {
        if (res.fields) {
          setSubmitted({ status: 'submitted' });
        } else {
          setSubmitted({ status: 'trouble' });
        }
      }, (err) => { discard(err); setSubmitted({ status: 'trouble' }); });
  };

  const setField = (event) => {
    const { name, value } = event.target;

    if (name === 'incumbent' || name === 'challenger') {
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
      <EndorsementIntro>
        <p>
          Thank you for your interest in earning an endorsement from In The Fight North
          Brooklyn!
        </p>

        <p>
          Please complete the questionnaire below and submit your answers. If invited to
          interview with our members, a member of the ITF-NBK electoral team will be in
          touch via the email you provide below.
        </p>

        <p>
          An endorsement from In the Fight North Brooklyn comes with our organization&apos;s
          commitment of time, resources, and mutual support. We focus on endorsing in
          local elections that impact our North Brooklyn community.
        </p>

        <p>
          We are currently focusing on speaking with candidates for the following offices:
          <ul>
            <li>Mayor</li>
            <li>Public Advocate</li>
            <li>Comptroller</li>
            <li>Brooklyn Borough President</li>
            <li>City Council Districts: 33, 34, 35, 36 & 37</li>
          </ul>
        </p>

        <p>
          If you are a candidate for an office not listed above, give us a shout! We
          routinely support candidates that share our values, and would love to get
          involved and see how we can work together. If you have any issues with the
          questionnaire or need to contact us, you can reach us
          at
          {' '}
          <a href="mailto: electoral@inthefight.org">electoral@inthefight.org</a>
          .
        </p>
      </EndorsementIntro>

      {/* Note: Most fields in this form default to required, because that's
        * what we usually want. This is the reverse of normal HTML, which,
        * granted, might be a little surprising. But it's also siginificantly
        * less code in practice. */}

      <Form onSubmit={handleSubmit}>
        <FormNumberedFields>
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
          <FormTextInput
            label="Current Office / Occupation"
            name="occupation"
            setField={setField}
          />
          <FormTextInput
            label="Preferred Campaign Point of Contact (Name)"
            name="contactName"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Preferred Campaign Point of Contact (Role)"
            name="contactRole"
            setField={setField}
            required={false}
          />
          <li>
            <Label>
              <div>Preferred Campaign Point of Contact (Email)</div>
              <Input type="email" name="email" onChange={setField} required="true" />
            </Label>
          </li>
          <li>
            <Label>
              <div>Preferred Campaign Point of Contact (Phone Number)</div>
              <Input type="tel" name="phone" onChange={setField} />
            </Label>
          </li>
          <li>
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
          </li>
          <FormTextInput
            label="Name of Your Campaign Committee"
            name="committee"
            setField={setField}
          />
          <FormTextInput
            label="Campaign Address"
            name="campaignAddress"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Campaign Zip"
            name="campaignZip"
            setField={setField}
          />
          <FormTextInput
            label="Campaign Website"
            name="website"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Campaign Facebook"
            name="facebook"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Campaign Twitter"
            name="twitter"
            setField={setField}
            required={false}
          />
          {/* TODO: make a list-able thing. Maybe should allow multiple? */}
          <FormTextInput
            label="Other campaign social media accounts (please list)"
            name="socialMedia"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Name of Office you are seeking"
            name="office"
            setField={setField}
          />
          <Label>
            <li>
              <div>District Number, if applicable</div>
              <NumberInput type="number" name="districtNumber" onChange={setField} />
            </li>
          </Label>
          {/* TODO: Add the additional text. Does it fight in a label, or do we
            * need a separate note? */}
          <LinesSought
            legend='Check all of the party lines you are seeking, including any "non-official party lines"'
            setField={setField}
            parties={parties}
          />
          <Bool
            label="Are you an incumbent?"
            name="incumbent"
            setField={setField}
          />
          <Bool
            label="Are you challenging an incumbent?"
            name="challenger"
            setField={setField}
          />
          <FormTextInput
            label="Name of incumbent (if applicable)"
            name="incumbentName"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Name of primary opponent(s) if applicable"
            name="primaryOpponents"
            setField={setField}
            required={false}
          />
          <FormTextInput
            label="Name of general election opponent(s) if applicable/known"
            name="generalOpponents"
            setField={setField}
            required={false}
          />
          <FormTextArea setField={setField} name="vision">
            <div>
              <TextAreaLabelPara>
                Tell us about who you are and why you are running. Include your core values and
                vision.
              </TextAreaLabelPara>
              <TextAreaLabelPara>
                What are the biggest challenges facing the district you hope to represent? What
                needs to happen for those to be resolved?
              </TextAreaLabelPara>
            </div>
          </FormTextArea>
          <FormTextArea setField={setField} name="engagement">
            <div>
              How will you engage with diverse groups across the district you hope to
              represent? Religious, ethnic, immigration status, health status, LGBTQIA+, etc.
            </div>
          </FormTextArea>
          <FormTextArea setField={setField} name="priorRuns">
            <div>Have you run for office previously? If so, please provide details.</div>
          </FormTextArea>
          {/* TODO: Make list */}
          <FormTextArea setField={setField} name="endorsements" required={false}>
            <div>
              Please list other endorsements you have earned, especially from unions, progressive
              organizations, and progressive elected officials.
            </div>
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
            <div>
              What are your top 3 priorities or policies you hope to accomplish in this
              term of office? Please be realistic about the scope of the office.
            </div>
          </FormTextArea>
          <FormTextArea setField={setField} name="itfLove">
            <div>Why do you want In The Fight NBK&apos;s endorsement?</div>
          </FormTextArea>
          <FormTextArea setField={setField} name="itfMembers" rows={5}>
            <div>
              Were you referred to In The Fight NBK by any of our members? (here
              is where you name drop!)
            </div>
          </FormTextArea>
          <FormTextArea setField={setField} name="justice">
            <div>
              <TextAreaLabelPara>
                Are you committed to fighting for a society built on true racial,
                economic and gender justice and equity?
              </TextAreaLabelPara>
              <TextAreaLabelPara>Please provide examples showing this work.</TextAreaLabelPara>
            </div>
          </FormTextArea>
          <FormButtonContainer>
            <Button text="Submit" color="purple" />
          </FormButtonContainer>
        </FormNumberedFields>
        <SubmitMsg
          submitted={submitted}
          successMsg="Thank you! Your answers have been submitted."
          errMsg="There was a problem submitting the form"
          pendingMsg="Submitting your answer..."
        />
      </Form>
    </Layout>
  );
};

export default Endorsements;
