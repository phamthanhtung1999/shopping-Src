import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLAYHOLDER } from "../../../constants/index"
import { formatPrice } from "../utils/index"
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.imagePath ? `${STATIC_HOST}${product.imagePath}` : `${THUMBNAIL_PLAYHOLDER}`;
  return (
    <Box padding={1}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width='100%' />
      </Box>
      <Typography variant='body2'>{product.name}</Typography>
      <Typography variant='body2'>
        <Box component="span" fontWeight="bold" mr={1} fontSize="16px">
          {formatPrice(product.unitPrice)}
        </Box>
      </Typography>
    </Box>
  );
}

export default Product;