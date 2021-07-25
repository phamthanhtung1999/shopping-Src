import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';


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
  const [productList, setProductList] = useState();
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    _page: 1,
  })

  useEffect(() => {
    (
      async () => {
        try {
          const { data, pagination } = await productApi.getAll(filter)
          setProductList(data.data.docs);
          setPagination(pagination);
          console.log(productList);
        } catch (error) {
          console.log("fetch productlist fail", error);
        }
        setLoading(false);

      }
    )();
  }, [filter])
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item className={classes.left}>left</Grid>
          <Grid item className={classes.right}>oc cho
            <ProductList productList={productList} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageProduct;