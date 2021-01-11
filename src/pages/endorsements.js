import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import EventsModal from '../components/organisms/eventsModal';
import Title from '../components/atoms/title';
import DateField from '../components/atoms/dateField';
import Location from '../components/atoms/location';
import Layout from '../components/templates/layout';
import Button from '../components/atoms/button';

// TODO: Required form elements
// TODO: Identify required?
// TODO: Show/hide incumbent when applicable (etc)?
const Form = styled.form`
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

const QuestionaireTitle = styled.h1`
  margin: 1em 0 0 100px;
  text-align: center;
`
const Input = styled.input`
  font-size: large;
  height: 27px;
  width: 600px;
`;

const Label = styled.label`
  display: flex;
  font-size: medium;
  flex-direction: column;
  margin: 10px 0 10px 0;
`;

const ButtonContainer = styled.div`
  margin-top: inherit;

  & input {
    margin-left: 110px;
    width: 500px !important;
  }
`;


const VirtualText = styled.p`
  font-weight: bold;
  margin: 10px;
`;


const Endorsements = ({ data }) => {

  return (
    <Layout>
      <Title text="Endorsement Questionaire"></Title>
      <Form>
        <Label>
          <div>Candidate's Full Name</div>
          <Input type="text" name="name" onChange="" />
        </Label>
        <Label>
          <div>Candidate's Pronouns</div>
          <Input type="text" name="name" onChange="" />
        </Label>
        <Label>
          <div>Election / Primary Date</div>
          <Input type="date" name="electionDate" onChange="" />
        </Label>
        <Label>
          <div>Current Office / Occupation</div>
          <Input type="text" name="occupation" onChange="" />
        </Label>
        <Label>
          <div>Candidate's Personal Email</div>
          <Input type="email" name="email" onChange="" />
        </Label>
        <Label>
          <div>Candidate's Cell</div>
          <Input type="tel" name="candiadteCell" onChange="" />
        </Label>
        <Label>
          <div>Zip Code</div>
          <Input type="text" name="candidateZip" onChange="" />
        </Label>
        {/* TODO: make this a select list  */}
        <Label>
          <div>In which political party are you currently registered?</div>
          <Input type="text" name="party" onChange="" />
        </Label>
        <Label>
          <div>Name of Your Campaign Commitee</div>
          <Input type="text" name="committee" onChange="" />
        </Label>
        <Label>
          <div>Campaign Address</div>
          <Input type="text" name="campaignAddress" onChange="" />
        </Label>
        <Label>
          <div>Campaign Zip</div>
          <Input type="text" name="campaignZip" onChange="" />
        </Label>
        <Label>
          <div>Campaign Manager / Point of Contact Name</div>
          <Input type="text" name="contactName" onChange="" />
        </Label>
        <Label>
          <div>Campaign Manager / Point of Contact Email</div>
          <Input type="email" name="contactEmail" onChange="" />
        </Label>
        <Label>
          <div>Campaign Website</div>
          <Input type="url" name="website" onChange="" />
        </Label>
        <Label>
          <div>Campaign Facebook</div>
          <Input type="text" name="facebook" onChange="" />
        </Label>
        <Label>
          <div>Campaign Twitter</div>
          <Input type="text" name="twitter" onChange="" />
        </Label>
        {/* TODO: make a list-able thing. Maybe should allow multiple?*/}
        <Label>
          <div>Other campaign social media accounts (please list)</div>
          <Input type="text" name="socialMedia" onChange="" />
        </Label>
        <Label>
          <div>Name of Office you are seeking</div>
          <Input type="text" name="office" onChange="" />
        </Label>
        <Label>
          <div>District Number, if applicable</div>
          <Input type="number" name="districtNumber" onChange="" />
        </Label>
        {/* TODO: a checkbox/button thing w/ all the parties */}
        {/* TODO: Add the additional text. Does it fight in a label, or do we need a separate note? */}
        <Label>
          <div>Chceck all of the party lines you are seeking, including any "non-official party lines"</div>
          <Input type="text" name="partyLines" onChange="" />
        </Label>
        {/* TODO: yes/no radio */}
        <Label>
          <div>Are you an incumbent?</div>
          <Input type="boolean" name="incumbent" onChange="" />
        </Label>
        <Label>
          <div>Are you challenging an incumbent?</div>
          <Input type="boolean" name="challenger" onChange="" />
        </Label>
        <Label>
          <div>Name of incumbent (if applicable)</div>
          <Input type="text" name="incumbentName" onChange="" />
        </Label>
        <Label>
          <div>Name of primary opponent(s) if applicable </div>
          <Input type="text" name="primaryOpponents" onChange="" />
        </Label>
        <Label>
          <div>Name of general election opponent(s) if applicable/known</div>
          <Input type="text" name="generalOpponents" onChange="" />
        </Label>
        <Label>
          <div>
            <p>Tell us about who you are and why you are running. Include your core values and vision.</p>
            <p>What are the biggest challenges facing the district you hope to repersent? What needs to happen for those to be resolved?</p>
          </div>
          <Input type="text" name="vision" onChange="" />
        </Label>
        <Label>
          <div>How will you engage with diverse groups across the district you hope to represent? Religious, ethnic, immigration status, helth status, LGBTQIA+, etc.</div>
          <Input type="text" name="engagement" onChange="" />
        </Label>
        <Label>
          <div>Have you run for office previously? If so, please provide details.</div>
          <Input type="text" name="priorRuns" onChange="" />
        </Label>
        {/* TODO: Make list */}
        <Label>
          <div>Please list other endorsements you have earned, especially from unions, progressive organizations, and progressive elected officials.</div>
          <Input type="text" name="endorsement" onChange="" />
        </Label>
        <Label>
          <div>What civic and political organizations are you involved with in the city?

          If we called them up, what would they tell us about you?</div>
          <Input type="text" name="orgs" onChange="" />
        </Label>
        <Label>
          <div>What would your best friends say about you?</div>
          <Input type="text" name="friends" onChange="" />
        </Label>
        <Label>
          <div>What is your greatest strength and greatest weakness as a candidate?</div>
          <Input type="text" name="strength" onChange="" />
        </Label>
        <Label>
          <div>What are your top 3 priorities or policies you hope to accomplish in this term of office? Please be realistic about the scope of the office.</div>
          <Input type="text" name="priorities" onChange="" />
        </Label>
        <Label>
          <div>Why do you want In The Fight NBK's endorsements?</div>
          <Input type="text" name="itflovel" onChange="" />
        </Label>
        <Label>
          <div>Were you referred to In The Fight NBK by any of our members? (here is where you name drop!)</div>
          <Input type="text" name="itfMembers" onChange="" />
        </Label>
        <Label>
          <div>
            <p>Are you committed to fighting for a society built on true racial,
               economic and gender justice and equity?</p>
            <p>Please provide examples showing this work.</p>
          </div>
          <Input type="text" name="justice" onChange="" />
        </Label>
        <ButtonContainer>
          <Button text="Request Endorsement" color="purple" />
        </ButtonContainer>
      </Form>
    </Layout>
  );
};

Endorsements.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Endorsements;
