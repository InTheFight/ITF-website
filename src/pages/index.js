import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../templates/layout';
import HomePageLogo from '../components/molecules/homePageLogo';
import BottomSection from '../components/organisms/BottomSection';
import HomeHeadlineSection from '../components/organisms/HomeHeadlineSection';

import footerImage from '../images/home-images/footer-image.png';
import MiddleSection from '../components/organisms/MiddleSection';

import homeImageA from '../images/home-images/home-image-a.png';
import homeImageB from '../images/home-images/home-image-b.png';
import homeImageC from '../images/home-images/home-image-c.png';

const IndexPage = ({ data }) => {
  const homepageData = data.allContentfulHomepageData.edges;

  return (
    <>
      <Layout>
        <HomePageLogo />
        {homepageData.map((homeData) => {
          const { title, simpleDescription, id } = homeData.node;
          return (
            <HomeHeadlineSection
              title={title}
              description={simpleDescription.simpleDescription}
              id={id}
            />
          );
        })}
        <MiddleSection
          sections={[
            {
              image: homeImageA,
              title: "What's New",
              text: '5/24 — ITF endorses a slate of progressive candidates in the upcoming local primary election.',
              linkObj: {
                link: '/',
                text: 'NEWS ➝',
              },
            },
            {
              image: homeImageB,
              title: 'Our Story',
              text: 'What does it mean to be In The Fight?',
              linkObj: {
                link: '/',
                text: 'ABOUT ➝',
              },
            },
            {
              image: homeImageC,
              title: 'Upcoming Events',
              text: 'Opportunities to learn from, engage with, and uplift our North Brooklyn community and beyond.',
              linkObj: {
                link: '/events',
                text: 'EVENTS ➝',
              },
            },
          ]}
        />
        <BottomSection
          firstContainerContent={{
            title: 'Subscribe for updates!',
          }}
          secondContainerContent={{
            text: "YOU DON'T GET WHAT YOU DON'T FIGHT FOR",
            image: footerImage,
          }}
        />
      </Layout>
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
