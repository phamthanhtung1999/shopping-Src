import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';
import CarouselIn from '../../../components/Carousel';
import ProductList from '../components/ProductList';
import queryString from 'query-string'
import ProductFilter from '../components/ProductFilter';


PageProduct.propTypes = {

};
const useStyle = makeStyles((theme) => ({
  left: {
    width: '200px'
  },
  right: {
    flex: "1 1 0",

  },

}))

function PageProduct(props) {
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const [pagination, setPagination] = useState({
    limit: 30,
    page: 1,
  });
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)

    return {
      ...params,
      _page: Number.parseInt(params.page) || 1,
      _limit: Number.parseInt(params._limit) || 30,
      category: params["category"],
    }
  }, [location.search])

  useEffect(() => {
    (
      async () => {
        try {
          const { data, pagination } = await productApi.getAll(queryParams)
          setProductList(data.data.docs);
          setPagination(pagination);
        } catch (error) {
          console.log("fetch productlist fail", error);
        }
        setLoading(false);
      }
    )(console.log("productList", productList));
  }, [queryParams])

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters
    }
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters)
    })
  };

  return (
    <Box>
      <Container>
        <CarouselIn />
        <Grid container >
          <Grid item className={classes.left}>
            <ProductFilter filters={queryParams} onChange={handleFiltersChange} />
          </Grid>
          <Grid item className={classes.right}>
            <ProductList productList={productList} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageProduct;