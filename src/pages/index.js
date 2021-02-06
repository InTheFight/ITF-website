import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/templates/layout';
import HomePageLogo from '../components/molecules/homePageLogo';
import BottomSection from '../components/organisms/BottomSection';
import HomeHeadlineSection from '../components/organisms/HomeHeadlineSection';

import footerImage from '../images/home-images/footer-image.png';
import MiddleSection from '../components/organisms/MiddleSection';

import homeImageA from '../images/home-images/home-image-a.png';
import homeImageB from '../images/home-images/home-image-b.png';
import homeImageC from '../images/home-images/home-image-c.png';
import Endorsements from '../pages/endorsements.js'

const IndexPage = ({ data }) => {
  const homepageData = data.allContentfulHomepageData.edges;

  return (
    <>
     <Endorsements />
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.node.isRequired,
};

export default IndexPage;

export const homePageQuery = graphql`
  query homePageQuery {
    allContentfulHomepageData {
      edges {
        node {
          id
          title
          simpleDescription {
            simpleDescription
          }
        }
      }
    }
  }
`;
