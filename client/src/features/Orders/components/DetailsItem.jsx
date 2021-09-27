import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core';

import { THUMBNAIL_PLAYHOLDER } from 'constants/common';

DetailsItem.propTypes = {
  orderDetails: PropTypes.object,
};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    borderBottom: '1px solid black',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  imagebox: {
    display: 'flex',
    alignItems: 'center',
    marginInline: theme.spacing(5),
  },
  image: {
    marginLeft: theme.spacing(2),
    border: '1px solid black',
    padding: theme.spacing(2),
  },
  qtt: {
    display: 'flex-row',

  }
}))

function DetailsItem({ orderDetails }) {
  const classes = useStyle();

  const thumbnailUrl = orderDetails.image_path ? `${orderDetails.image_path}` : `${THUMBNAIL_PLAYHOLDER}`;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography>Tên sản phẩm: <span>{orderDetails.product_name}</span></Typography>
      </Box>

      <Box className={classes.imagebox}>
        <Typography>Hình ảnh:</Typography>
        <Box className={classes.image}>
          <img src={thumbnailUrl} alt="nameSp" width='100px' height='100px' />
        </Box>
      </Box>

      <Box className={classes.qtt}>
        <Typography>Số lượng: {orderDetails.quantity}</Typography>
        <Typography>Giá 1 sản phẩm: {orderDetails.unit_price}</Typography>
        <Typography>Khuyến mãi: {`${orderDetails.discount} %`}</Typography>
      </Box>
    </Box>
  );
}

export default DetailsItem;