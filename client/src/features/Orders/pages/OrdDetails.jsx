import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouteMatch } from 'react-router';
import useOrdDetailsApi from '../hooks/useOrderDetails';
import { Box, Container, makeStyles, Paper } from '@material-ui/core';
import DetailsItem from '../components/DetailsItem';
import UserInItem from '../components/UserInItem';
import ListDetails from '../components/ListDetails';

OrdDetails.propTypes = {

};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',

  },
  info: {

  },
  details: {

  }

}))

function OrdDetails(props) {
  const { params: { orderId } } = useRouteMatch();
  const { order, loading } = useOrdDetailsApi(orderId);
  const classes = useStyle();
  console.log('order', order);

  return (
    <Box>
      <Container>
        <Paper>
          <Box className={classes.root}>
            <UserInItem info={order} className={classes.info} />

            <ListDetails listDetails={order} className={classes.details} />
          </Box>
        </Paper>
      </Container>

    </Box>
  );
}

export default OrdDetails;