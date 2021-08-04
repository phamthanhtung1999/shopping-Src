import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';
import CarouselIn from '../../../components/Carousel';
import ProductList from '../components/ProductList';
import queryString from 'query-string'


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
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
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


  return (
    <Box>
      <Container>
        <CarouselIn />
        <Grid container>
          <Grid container item className={classes.left}>left</Grid>
          <Grid container item className={classes.right}>
            oc cho
            <ProductList productList={productList} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageProduct;