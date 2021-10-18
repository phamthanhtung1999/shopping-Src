import { Badge, Box, Button, AppBar, Dialog, IconButton, Menu, MenuItem, makeStyles, Toolbar, Typography, DialogContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/login/index';
import Register from 'features/Auth/components/register/index';
import queryString from 'query-string'
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ShoppingCart } from '../../../node_modules/@material-ui/icons/index';
import DialogMigrate from 'components/DialogMigrate/index';
import { logout } from 'features/Auth/userSlice';
import { cartItemCountSelector } from 'features/Cart/Selector';
import SearchField from 'components/Search';

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
    marginInline: theme.spacing(2),
    "&:hover": {
      backgroundColor: 'white',
      color: "black",
      transition: "all 0.5s"
    }
  },
  cart: {
    color: 'white',
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: 'white',
      color: "black",
      transition: "all 0.5s"
    }
  },
  account: {
    color: 'white',
    borderRadius: `10px`,
    "&:hover": {
      backgroundColor: 'white',
      color: "black",
      transition: "all 0.5s"
    }
  },
}));

export default function AppHeader() {

  // const loggedInUser = useSelector(state => state.user.current)
  // console.log("loggedInUser", loggedInUser);
  // const status = !!loggedInUser.email
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // useEffect(() => {
  //   try {
  //     setIsLoggedIn(status)
  //   } catch (error) {
  //     console.log("fail to check statuslogin", error);
  //   }
  // }, [loggedInUser])
  const logginUser = localStorage.getItem('user');
  console.log("logginUser", logginUser);
  const isLoggedIn = !!logginUser
  console.log("checkLog", isLoggedIn);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const url = useRouteMatch();
  const history = useHistory();
  const cartItemCount = useSelector(cartItemCountSelector)
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
    setAnchorEl(null);
  }
  const classes = useStyles();
  const handleShoppingCartClick = () => {
    if (isLoggedIn) {
      history.push(`/cart`)
    } else {
      alert("Vui lòng đăng nhập trước!")
    }
  }
  const handleHomeClick = () => {
    history.push(`/products`)
  }
  const handleOrderClick = () => {
    history.push(`/orders`);
    setAnchorEl(null);
  }
  const handleSearchSubmit = (values) => {
    const filters = {
      name: values,
    }
    console.log(filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters)
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#303030' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shopping
          </Typography>
          <SearchField onSubmit={handleSearchSubmit} />
          <Box>
            <Button className={classes.home} onClick={handleHomeClick}>Sản Phẩm</Button>
          </Box>
          <IconButton className={classes.cart} aria-label="show 4 new mails" color="inherit">
            <Badge
              badgeContent={cartItemCount}
              color="secondary">
              <ShoppingCart
                onClick={handleShoppingCartClick}
              />
            </Badge>
          </IconButton>
          <Box className={classes.account}>
            {isLoggedIn === false ? (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>) : (
              <Button color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </Button>
            )}
          </Box>
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
        <MenuItem onClick={handleOrderClick}>My Orders</MenuItem>
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