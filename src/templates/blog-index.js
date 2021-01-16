import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Layout from './layout';

const BlogPostContainer = styled.div`
  max-height: 600px;
  max-width: 600px;
  margin-bottom: 200px;
  border: solid;
  border-color: black;
  `;

const PostImage = styled.img`
  max-width: 100%;
  max-height: 400px;
`;

const ImageContainer = styled.div`
  width: 600px;
  min-height: 400px;
  max-height: 400px;
`;

const PostTitle = styled.a`
  font-family: din-condensed;
  font-weight: bold;
  font-size: 30px;
`;

const BlogIndex = ({ pageContext: { blogPosts } }) => {
  const convertToSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const renderPosts = () => {
    if (blogPosts.length > 0) {
      return blogPosts.map((p) => (
        <BlogPostContainer>
          <ImageContainer>
            <PostImage src={p.thumbnail} alt="Post photo" />
          </ImageContainer>
          <PostTitle href={`blog/${convertToSlug(p.title)}`}>
            {p.title}
          </PostTitle>
        </BlogPostContainer>
      ));
    }
    return null;
  };

  return (
    <Layout>
      {renderPosts()}
    </Layout>
  );
};

export default BlogIndex;

BlogIndex.propTypes = {
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
