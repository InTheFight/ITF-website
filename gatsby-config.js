require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'In The Fight',
    description: 'In The Fight North Brooklyn',
    author: '@fridaland',
    menuLinks: [
      {
        name: 'Contact',
        url: '/contact',
      },
      {
        name: 'Events',
        url: '/events',
      },
      {
        name: 'Blogs',
        url: '/blogs',
      },
      {
        name: 'Resources',
        url: '/resources',
      },
    ],
    tokens: {
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      spaceId: process.env.SPACE_ID,
      apiKey: process.env.CONTENTFUL_MANAGEMENT_API_KEY
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: 'cdn.contentful.com',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'resources',
        path: `${__dirname}/resources/`,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
        timeout: 3500,
      },
    }
  ],
};
