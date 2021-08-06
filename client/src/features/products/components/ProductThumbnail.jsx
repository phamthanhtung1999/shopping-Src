import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import { THUMBNAIL_PLAYHOLDER } from 'constants/common';
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers'

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {

  const thumbnailUrl = product.imagePath ? `${product.imagePath}` : `${THUMBNAIL_PLAYHOLDER}`;
  return (
    <Box>
      < Magnifier
        imageSrc={thumbnailUrl} imageAlt={product.name} width='100%'
        mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
        touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
      />
    </Box>
  );
}

export default ProductThumbnail;
