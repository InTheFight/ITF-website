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

module.exports.makeSlug = makeSlug;
