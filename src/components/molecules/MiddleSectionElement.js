import React from 'react';
import { Link } from 'gatsby';
import PropTypes, { string } from 'prop-types';

const MiddleSectionElement = ({ imagePosition, image, title, text, linkObj }) => {
  if (imagePosition === 'left') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 100,
        }}
      >
        <img style={{ flex: 5, width: '100%' }} src={image} alt="Brooklyn" />
        <div
          style={{
            flex: 4,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 60,
          }}
        >
          <h2>
            {title}
          </h2>
          <p>{text}</p>
          <Link to={linkObj.link}>{linkObj.text}</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 100,
      }}
    >
      <div
        style={{
          flex: 4,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 60,
          minWidth: 200,
        }}
      >
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to={linkObj.link}>{linkObj.text}</Link>
      </div>
      <img style={{ flex: 5, width: '100%' }} src={image} alt="Brooklyn" />
    </div>
  );
};

MiddleSectionElement.propTypes = {
  imagePosition: string,
  image: string,
  title: string,
  text: string,
  linkObj: PropTypes.instanceOf(Object),
};

MiddleSectionElement.defaultProps = {
  imagePosition: 'left',
  image: '',
  title: '',
  text: '',
  linkObj: {},
};

export default MiddleSectionElement;
