import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from '../utils';

ProductDecription.propTypes = {
  product: PropTypes.object,
};
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  description: {
    margin: '10px 0px'
  },
  titlePrice: {
    fontWeight: "bold"
  },
  price: {
    padding: "5px 0px",
    fontWeight: "bold",
    fontSize: "25px",
    color: "#d62f27"
  }
}))

function ProductDecription({ product }) {
  const classes = useStyle();
  console.log(product);
  return (
    <Box className={classes.root}>
      <Typography className={classes.description}>{product.description}</Typography>
      <Typography className={classes.titlePrice}>Giá sản phẩm</Typography>
      <Typography className={classes.price}>{formatPrice(product.unitPrice)}</Typography>
    </Box>
  );
}

export default ProductDecription;