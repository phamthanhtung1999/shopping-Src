import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router';
import OrdersPages from './pages/OrdersPages';
import OrdDetails from './pages/OrdDetails';

Orders.propTypes = {

};

function Orders(props) {
  const match = useRouteMatch();
  return (
    <Box py={4} style={{ backgroundColor: '#e8dbda' }}>
      <Switch>
        <Route path={match.url} exact component={OrdersPages} />
        <Route path={`${match.url}/:orderId`} component={OrdDetails} />
      </Switch>
    </Box>
  );
}

export default Orders;