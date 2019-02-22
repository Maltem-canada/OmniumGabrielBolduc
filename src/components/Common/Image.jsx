import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

const Image = (props) => {
  const {
    image,
  } = props;
  const url = (image && image.image && image.image.url) || '';
  const description = (image && image.description)
    || (image && image.image && image.image.name && image.image.name.split('.')[0])
    || '';
  return (
    <img
      {...props}
      src={config.backendURL + url}
      alt={description}
    />
  );
};

Image.propTypes = {
  image: PropTypes.objectOf(Object),
};
Image.defaultProps = {
  image: {
    image: {
      url: '',
    },
    description: '',
  },
};


export default Image;
