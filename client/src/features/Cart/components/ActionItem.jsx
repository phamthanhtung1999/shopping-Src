import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { removeFromCart } from '../CartSlice';

ActionItem.propTypes = {
  id: PropTypes.number,
  product: PropTypes.object,
};

function ActionItem({ id, product }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDetailClick = () => {
    history.push(`/products/${product.slug}`)
  }
  const handleRemoveClick = () => {
    const action = removeFromCart(
      id
    );
    dispatch(action);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Button onClick={handleRemoveClick} variant="outlined" color='secondary' >Remove</Button>
      <Button onClick={handleDetailClick} variant="outlined" color='primary'>Details</Button>
    </div>
  );
}

export default ActionItem;