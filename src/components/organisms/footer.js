import React from 'react';
import styled from 'styled-components';
import FooterText from '../molecules/footerText';

import IconsPanel from '../molecules/iconsPanel';

const FooterStyle = styled.div`
  margin-top: 100px;
  min-height: 140px;
  background-color: #faf5eb;
  color: #2c358f;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Copyright = styled.h4`
  margin: 0;
  margin-top: auto;
  @media (max-width: 360px) {
    margin: 10px 0 0;
    text-align: center;
    width: 100%;
  }
`;

const SocalMedia = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap-reverse;
`;

const Footer = () => (
  <FooterStyle>
    <FooterText />
    <SocalMedia>
      <Copyright> &#169;2021</Copyright>
      <IconsPanel />
    </SocalMedia>
  </FooterStyle>
);
export default Footer;
