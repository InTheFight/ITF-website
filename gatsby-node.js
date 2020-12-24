/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { makeSlug } = require('./src/lib/utils')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/components/templates/blog-post.js`)
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

  const posts = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {glob: "**/posts/*"}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (posts.errors || resources.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
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
  posts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}
