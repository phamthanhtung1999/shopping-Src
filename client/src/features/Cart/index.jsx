import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import CartDetails from './components/CartDetails';
import { useSelector } from 'react-redux';
import { cartItemCountSelector } from './Selector';
import CartNull from './components/CartNull';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}))
CartFeature.propTypes = {

};

function CartFeature(props) {
  const classes = useStyles();
  const list = useSelector((state) => state.cart.cartItems)
  const quantity = useSelector(cartItemCountSelector);

  return (
    <Box className={classes.root}>
      <Container>
        <Typography style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '24px', marginBottom: '35px' }}>
          Giỏ hàng của bạn</Typography>
        {quantity >= 1 ? (
          <Paper>
            <CartDetails list={list} />
          </Paper>) : (<Paper>
            <CartNull />
          </Paper>)}
      </Container>
    </Box>
  );
}

export default CartFeature;