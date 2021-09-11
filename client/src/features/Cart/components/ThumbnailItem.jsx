import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { THUMBNAIL_PLAYHOLDER } from "../../../constants/index"

ThumbnailItem.propTypes = {
  product: PropTypes.object,
};

function ThumbnailItem({ product }) {
  const thumbnailUrl = product.imagePath ? `${product.imagePath}` : `${THUMBNAIL_PLAYHOLDER}`;
  return (
    <Box padding={1} minHeight="50px">
      <img src={thumbnailUrl} alt={product.name} width='50px' height='50px' />
    </Box>
  );
}

export default ThumbnailItem;