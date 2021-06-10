import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 460px;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const ImageBackground = styled.img`
  width: 100%;
  position: absolute;
  top: -20;
  z-index: -9999;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 150px;
  width: 800px;
`;

const Text = styled.p`
  font-family: 'urw-din';
  font-weight: bold;
  font-size: 80px;
  color: #faf5eb;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const SecondFooterSection = ({ text, image }) => (
  <Container>
    <ImageBackground src={image} />
    <Content>
      <Text>{text}</Text>
    </Content>
  </Container>
);

SecondFooterSection.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
};

export default SecondFooterSection;
