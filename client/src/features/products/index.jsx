import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import PageProduct from './pages/PageProduct';

ProductFeature.propTypes = {

};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} component={PageProduct} exact />
        <Route path={`${match.url}/:productSlug`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;