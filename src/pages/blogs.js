import React, { useEffect, useState } from 'react';

import Layout from '../components/templates/layout';
import Title from '../components/atoms/title';
import renderHTML from 'react-render-html';

const axios = require('axios');

const Blogs = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        console.log(process.env.MEDIUM_ENDPOINT);
        const response = await axios.get(process.env.MEDIUM_ENDPOINT);
        setPosts(response.data.items)
      } catch (e) {
        setError('Something went wrong.')
      }
    })();
  }, [])

  const renderPosts = () => {
    if (posts.length > 0) {
        return posts.map((p) => {
          return (
            <div>
              <Title text={p.title}/>
              <div>
                {renderHTML(p.content)}
              </div>
            </div>
          )
        })
      }
  }
  return (
    <Layout>
      {renderPosts()}
    </Layout>
  )
};

export default Blogs;
