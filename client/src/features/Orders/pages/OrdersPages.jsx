import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import orderApi from 'api/orderApi';
import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import OrdListTable from '../components/OrdListTable';

OrdersPages.propTypes = {

};
const useStyle = makeStyles((theme) => ({
  root: {},
  titlePages: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    fontSize: '18px',
    '&>span': {
      fontSize: "30px",
      fontWeight: 'bold',
    }
  }
}))

function OrdersPages(props) {
  const [orderList, setOrderList] = useState([]);
  const classes = useStyle();

  useEffect(() => {
    (
      async () => {
        try {
          const res = await orderApi.getAll();
          setOrderList(res)
        } catch (error) {
          console.log("fail to fetch orderList", error);
        }
      }
    )()
  }, [])

  return (
    <Box>
      <Container>
        <Box>
          <Paper elevation={2}>
            <Box py={3}>
              <Typography className={classes.titlePages}><span>Shopping ||</span> &nbsp; Danh sách đơn hàng</Typography>
            </Box>
          </Paper>
          <OrdListTable data={orderList} />
        </Box>
      </Container>
    </Box>
  );
}

export default OrdersPages;