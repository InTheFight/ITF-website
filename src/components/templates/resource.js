import React from 'react';
import { graphql } from 'gatsby';

export default function Resource({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <div className="resource-container">
      <div className="resource">
        <h1>{frontmatter.title}</h1>
        <div className="resource-content"
             dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
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
`
