/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { makeSlug } = require('./src/lib/utils')


console.log("gatsby-node env" + process.env.SPACE_ID);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const resourceTemplate = require.resolve(`./src/components/templates/resource.js`)

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
  `)

  // Handle errors
  if (resources.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
  }

  function resourcePaths(n) { makeSlug(n, "resources") }

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
    })
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
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
};
