import React from 'react';
import PropTypes from 'prop-types';
import { cartItemSelector, cartTotalSelector } from '../Selector';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { formatPrice } from 'features/products/utils';
import { useSelector } from 'react-redux';
import orderApi from 'api/orderApi';

Paying.propTypes = {

};

function Paying({ props }) {
  const totalValue = useSelector(cartTotalSelector);
  const listItem = useSelector(cartItemSelector)
  const details = listItem.map((item) =>
  ({
    product_id: item.id,
    quantity: item.quantity
  })
  )
  const handleBuy = () => {
    (
      async () => {
        try {
          await orderApi.add(details)

          console.log("thanh cong order", details);

        } catch (error) {
          console.log("fetch productlist fail", error);
        }
      }
    )();
  }

  return (
    <Box >
      <Paper style={{ display: 'flex', height: '50px', alignItems: 'center', justifyContent: 'end' }}>
        <Typography style={{ marginRight: '25px' }}>Tổng tiền: {formatPrice(totalValue)}</Typography>
        <Button style={{ marginRight: '25px', backgroundColor: '#857269' }}
          onClick={handleBuy}
        >Thanh Toán</Button>
      </Paper>
    </Box>
  );
}

export default Paying;