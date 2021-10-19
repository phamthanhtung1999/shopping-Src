import { Box, makeStyles, TextField, Input, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { removeFromCart, setQuantity } from '../CartSlice';



const useStyles = makeStyles(theme => ({
  root: {
  },
  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    padding: "0px auto",
    justifyContent: 'center',
  },
  // count: {
  //   width: '50%'
  // }
}))
QuantityCartField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number,
};
function QuantityCartField({ quantity, name, id }) {
  const schema = yup.object().shape({
    quantity: yup.number().required('please enter quantity !')
      .min(1, 'minimum value is 1!')
      .typeError("please enter a number"),
  });
  const classes = useStyles();
  const count = quantity;
  const dispatch = useDispatch();
  const handlePlusQuantity = () => {
    const quantity = count + 1;
    console.log("id", id);
    const action = setQuantity(
      { id, quantity }
    )
    dispatch(action)
  }
  const handleDelQuantity = () => {
    const quantity = count - 1;
    if (quantity > 0) {
      const action = setQuantity(
        { id, quantity }
      )
      dispatch(action)
    } else {
      const action = removeFromCart(
        id
      )
      dispatch(action)
    }

  }
  return (
    <Box className={classes.box}>
      <IconButton onClick={handleDelQuantity}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography >{count}</Typography>
      <IconButton onClick={handlePlusQuantity}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
}
export default QuantityCartField;