import React, { useEffect, useState } from 'react';

import Layout from '../components/templates/layout';
import Title from '../components/atoms/title';

const axios = require('axios');

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        console.log(process.env.MEDIUM_ENDPOINT);
        const response = await axios.get(process.env.MEDIUM_ENDPOINT);
      } catch (e) {
        setError('Something went wrong.')
      }
    })();
  }, [])

  return (
    <Layout>
      <Title text="Blogs" />
    </Layout>
  )
};

export default Blogs;
