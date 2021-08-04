import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import CartEmpty from './components/CartEmpty';
import CartDetails from './components/CartDetails';
import { useSelector } from 'react-redux';
import { cartItemCountSelector } from './Selectors';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
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
        {quantity >= 1 ? (
          <Paper>
            <CartDetails list={list} />
          </Paper>) : (<Paper>
            <CartEmpty />
          </Paper>)}
      </Container>
    </Box>
  );
}

export default CartFeature;