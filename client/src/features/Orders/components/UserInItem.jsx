import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { formatPrice } from 'features/products/utils';


UserInItem.propTypes = {
  info: PropTypes.object,
};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRight: '1px solid black',

  },
  title: {
    fontWeight: 'bold',
    fontSize: '22px'
  },
  avt: {
    display: ' flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  item: {
    fontWeight: '',
    padding: theme.spacing(1),
    '&>span': {
      fontWeight: 'bold'
    }
  }
}))
function UserInItem({ info }) {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Thông tin người mua</Typography>
      <Box className={classes.avt}>
        <Typography className={classes.name}>{info.receiver_name}</Typography>
      </Box>
      <Typography className={classes.item}>SDT: <span> {info.receiver_phone}</span></Typography>
      <Typography className={classes.item}>Địa chỉ: <span>{info.receiver_address}</span></Typography>
      <Typography className={classes.item}>Trạng thái ĐH: <span>{info.status}</span></Typography>
      <Typography className={classes.item}>Giá trị ĐH: <span>{formatPrice(info.total_amt)}</span></Typography>
    </Box>
  );
}

export default UserInItem;