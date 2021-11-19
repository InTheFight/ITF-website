/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');
const { makeSlug } = require('./src/lib/utils');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const resourceTemplate = require.resolve(`./src/templates/resource.js`);
  const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`);

  // TODO would be more efficient to do one query and split, but so it goes
  const resources = await graphql(`
    {
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
  `);

  // Handle errors
  if (resources.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
  }

  resources.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = makeSlug(node,"resources")
    createPage({
      path: slug,
      component: resourceTemplate,
      context: {
        // additional data can be passed via context
        slug: slug,
        id:   node.id,
      },
    });
  });

  let blogPosts = [];
  try {
    blogPosts = await axios.get(process.env.MEDIUM_ENDPOINT);
  } catch {
    reporter.panicOnBuild(`Error while fetching blog posts`);
  } finally {
    blogPosts = blogPosts.data.items;
    createPage({
      path: `/blog`,
      component:  require.resolve('./src/templates/blog-index.js'),
      context: { blogPosts },
    })

    if (blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        const convertToSlug = (title) => {
          return title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        }
    
        createPage({
          path: `/blog/${convertToSlug(post.title)}`,
          component: blogPostTemplate,
          context: {
            slug: convertToSlug(post.title),
            id:   post.guid,
            post: post,
          },
        });
      });
    }
  }
};

exports.onCreateBabelConfig = ({ node, actions, getNode }) => {
  if (process.env.NODE_ENV !== 'development') {
    actions.setBabelPlugin({
      name: '@babel/plugin-transform-regenerator',
      options: {},
    });
    actions.setBabelPlugin({
      name: '@babel/plugin-transform-runtime',
      options: {},
    });
  }

  const { createNodeField } = actions;
    if (node) {
      if (node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode })
        createNodeField({
          name: 'slug',
          node,
          value,
        });
      }
    }
}
