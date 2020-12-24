import React from 'react';
import PropTypes from 'prop-types';

const LinksItem = ({ url, text }) => (
  <li data-testid="links-item">
    <a href={url}>{text}</a>
  </li>
);

LinksItem.defaultProps = {
  text: '',
};

LinksItem.propTypes = {
  text: PropTypes.string,
  url: PropTypes.isRequired,
};

export default LinksItem;
