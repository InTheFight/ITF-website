import React from 'react';
import { graphql } from 'gatsby';

export default function Post({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <div className="blogpost-container">
      <div className="blogpost">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blogpost-content"
             dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
};

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: { eq: $slug }}) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`
