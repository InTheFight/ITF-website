import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

export default function Resource({ data }) {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <div className="resource-container">
      <div className="resource">
        <h1>{frontmatter.title}</h1>
        <div
          className="resource-content"
/* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{ __html: html }}
/* eslint-enabale react/no-danger */
        />
      </div>
    </div>
  );
}

Resource.propTypes = {
  data: PropTypes.objectOf(PropTypes.object()).isRequired,
};

export const resourceQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
