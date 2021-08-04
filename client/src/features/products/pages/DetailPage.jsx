import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useProductDetailApi from '../hooks/useProductDetails';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductDecription from '../components/ProductDecription';
import { addToCart } from 'features/Cart/CartSlice';
import AddToCartForm from 'features/Cart/components/AddToCartForm';

DetailPage.propTypes = {

};
const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1),
  },
  left: {
    width: "500px",
    padding: theme.spacing(1.5),
    borderRight: ` 1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
    marginLeft: "25px"
  },
  loading: {
  },
  nameProduct: {
    fontWeight: 'bold',
    fontSize: "25px"
  },
  titleDetails: {
    fontWeight: "bold",
    fontSize: "18px"
  }
}))

function DetailPage(props) {
  const classes = useStyles();
  const { params: { productSlug } } = useRouteMatch();
  const dispatch = useDispatch();
  const { product, loading } = useProductDetailApi(productSlug);
  if (loading) {
    return <Box className={classes.loading}>
      <LinearProgress />
    </Box>
  }
  const stock = product.stock;


  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  }
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          {stock > 0
            ? <Typography className={classes.nameProduct}>{`${product.name} - (Còn hàng)`}</Typography >
            : <Typography className={classes.nameProduct}>{`${product.name} - (Tạm thời đang hết hàng)`}</Typography>}
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <Typography className={classes.titleDetails}>Thông tin chi tiết</Typography>
              <ProductDecription product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;