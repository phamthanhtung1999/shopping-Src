import { Badge, Box, Button, AppBar, Dialog, IconButton, Menu, MenuItem, makeStyles, Toolbar, Typography, DialogContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/login/index';
import Register from 'features/Auth/components/register/index';

import { default as React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ShoppingCart } from '../../../node_modules/@material-ui/icons/index';
import DialogMigrate from 'components/DialogMigrate/index';
import { logout } from 'features/Auth/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: theme.palette.grey[500]
  },
  home: {
    borderRadius: `10px`,
    color: 'white',
    flexGrow: 1,

  },
}));

export default function AppHeader() {
  const loggedInUser = useSelector(state => state.user.current)
  const isLoggedIn = !!loggedInUser.email;
  console.log(isLoggedIn);
  const [open, setOpen] = React.useState(false);
  // const [mode, setMode] = useState(MODE.LOGIN);
  const [mode, setMode] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const url = useRouteMatch();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  }
  const handleLogOut = () => {
    // const remove = setNullCartItem();
    // dispatch(remove);
    const action = logout();
    dispatch(action);
  }
  const classes = useStyles();
  // const handleShoppingCartClick = () => {
  //   if (isLoggedIn) {
  //     history.push(`/cart`)
  //   } else {
  //     alert("Vui lòng đăng nhập trước!")
  //   }
  // }
  const handleHomeClick = () => {
    history.push(`/`)
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#303030' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Typography className={classes.link} to="/">
              Shopping
            </Typography>
          </Typography>
          <Box>
            <Button className={classes.home} onClick={handleHomeClick}>Sản Phẩm</Button>
          </Box>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge
              // badgeContent={cartItemCount} 
              color="secondary">
              <ShoppingCart
              // onClick={handleShoppingCartClick} 
              />
            </Badge>
          </IconButton>
          {isLoggedIn === false ? (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>) : (
            <Button color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </Button>
          )}
          {/* {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </Button>
          )} */}
        </Toolbar>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>

      <DialogMigrate
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === "login" ? (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => {
                  setMode("register")

                }}>Dont have an account . Register heree</Button>
              </Box>
            </>
          ) : (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode("login")}>Already have an acount. Login here</Button>
              </Box>
            </>
          )}
        </DialogContent>
      </DialogMigrate>
    </div>
  );
}