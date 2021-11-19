import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { makeSlug } from '../lib/utils';
import Layout from '../templates/layout';
import LinksItem from '../components/atoms/listItem';

const Resources = ({ data }) => {
  const resourcesData = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <ul>
        {resourcesData.map((resource) => {
          const { id, frontmatter } = resource.node;
          const url = makeSlug(resource.node, 'resources');
          return (
            <div key={id}>
              <LinksItem url={url} text={frontmatter.title} />
            </div>
          );
        })}
      </ul>
    </Layout>
  );
};

Resources.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Resources;

export const resourcesQuery = graphql`
    query ResourcesQuery {
      allMarkdownRemark(
         filter: {fileAbsolutePath: {glob: "**/resources/*"}}
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `;
