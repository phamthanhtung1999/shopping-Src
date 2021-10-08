import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { useHistory } from 'react-router';

CartNull.propTypes = {

};
const useStyles = makeStyles((theme) => ({
  root: {

  },
  cartImg: {
    justifyContent: 'center',
    height: "500px",
    display: "flex",
    alignItems: 'center',
  },
  buttonback: {

    "&:hover": {
      backgroundColor: "black",
      color: "white",
      transition: "all 0.5s"
    }
  }
}))

function CartNull(props) {
  const classes = useStyles();
  const history = useHistory();
  const handleBacktoStore = () => {
    history.push("/products")
  }
  return (
    <Box className={classes.root}>

      <Box className={classes.cartImg}>
        <Box>
          <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" />
          <Typography><strong>Giỏ hàng đang trống</strong></Typography>
          <Button
            className={classes.buttonback}
            onClick={handleBacktoStore}>
            Quay lại cửa hàng</Button>
        </Box>


      </Box>

    </Box>
  );
}

export default CartNull;