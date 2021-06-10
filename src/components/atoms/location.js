import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import locationPin from '../../images/icons/locationPin.png';

const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LocationIcon = styled.img`
  height: 25px;
  width: 25px;
  margin: 7px 10px 0 0;
  `;

const Location = ({ location, virtual }) => {
  const virtualOrLocation = virtual ? 'Virtual event' : location;
  return (
    <LocationContainer>
      <LocationIcon src={locationPin} alt="Location" />
      <p data-testid="date-field">
        {virtualOrLocation}
      </p>
    </LocationContainer>
  );
};

Location.propTypes = {
  location: PropTypes.string.isRequired,
  virtual: PropTypes.bool.isRequired,
};

export default Location;
