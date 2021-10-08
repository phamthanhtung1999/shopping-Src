import React from 'react';
import PropTypes from 'prop-types';

import { InputBase, makeStyles, alpha, Button, Box, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

SearchField.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    "&:hover": {
      border: "1px solid black",
      backgroundColor: 'black',
      color: 'white',
      transition: "all 0.5s"
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchField(props) {
  const classes = useStyles();
  const [state, setState] = useState();
  const handleSearchSubmit = () => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(state)
    }
  }
  const inputChange = async (value) => {
    await setState(value)
    console.log(state);
  }
  return (
    <div
      className={classes.search}>
      <Button
        className={classes.searchIcon}
        padding={0}
        onClick={handleSearchSubmit}
      >
        <SearchOutlined />
      </Button>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,

        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => { inputChange(e.target.value) }}
      />
    </div>
  );
}

export default SearchField;