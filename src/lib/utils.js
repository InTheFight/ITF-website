function makeSlug(node, prefix) {
  function urlizePath(p) {
    // Trim directories   ---     drop file extension --- replace whitespace with dashes
    return p.replace(RegExp('/.*/'), '').replace(/\.[^.]*$/, '').replace(/[\W]/g, '-');
  }

  let slg = '';
  if (node.frontmatter.slug) {
    slg = node.frontmatter.slug;
  } else {
    slg = urlizePath(node.fileAbsolutePath);
  }

  if (prefix) {
    slg = `${prefix}/${slg}`;
  }

  return slg;
}

// Explicitly igonre an argument, with warnings turned off
// Useful in promises, where we sometimes need a handler to take an argument, but
// don't have anything in particular to do with it

/* eslint-disable no-unused-vars */
function discard(val) {}
/* eslint-enable no-unused-vars */

module.exports.makeSlug = makeSlug;
module.exports.discard = discard;
