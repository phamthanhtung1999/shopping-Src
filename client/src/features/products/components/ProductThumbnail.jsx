import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import { THUMBNAIL_PLAYHOLDER } from 'constants/common';
import Magnifier from "react-magnifier";
ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {

  const thumbnailUrl = product.imagePath ? `${product.imagePath}` : `${THUMBNAIL_PLAYHOLDER}`;
  return (
    <Box>
      < Magnifier
        src={thumbnailUrl} alt={product.name} width='100%' mgWidth={80} mgHeight={80}
      />
    </Box>
  );
}

export default ProductThumbnail;
