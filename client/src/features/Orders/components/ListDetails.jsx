import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import DetailsItem from './DetailsItem';
import { useState } from 'react'; import { useEffect } from 'react';

;

ListDetails.propTypes = {
  listDetails: PropTypes.object,
};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),

  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '22px'
  },
}))

function ListDetails({ listDetails }) {
  const classes = useStyle();
  const [dataDetails, setDataDetails] = useState([]);
  useEffect(() => {
    if (listDetails?.details) {
      setDataDetails(listDetails.details)

    }
  }, [listDetails]);

  console.log("dataDetails", dataDetails);

  return (
    <Box className={classes.root}>
      <Box >
        <Typography className={classes.title}>Thông tin đơn hàng</Typography>
      </Box>
      <Grid>
        {dataDetails.length > 0 && dataDetails.map((item) => (
          <Grid key={item.product_id}>
            <DetailsItem orderDetails={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListDetails;