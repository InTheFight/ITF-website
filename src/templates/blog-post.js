import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import renderHTML from 'react-render-html';
import Layout from './layout';
import Title from '../components/atoms/title';

const BlogPostContainer = styled.div`
  margin: 0px 80px 0px 80px;
`;

export default function BlogPost({ pageContext: { post } }) {
  return (
    <Layout>
      <BlogPostContainer>
        <Title text={post.title} />
        <div>
          {renderHTML(post.content)}
        </div>
      </BlogPostContainer>
    </Layout>
  );
}

BlogPost.propTypes = {
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
