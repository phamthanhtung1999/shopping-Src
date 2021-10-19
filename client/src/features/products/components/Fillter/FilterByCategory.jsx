import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import categoriesApi from 'api/categoryApi';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all 0.25s',

      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer'
      }
    }
  }
}))

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      try {
        const list = await categoriesApi.getAll();
        setCategoryList(list.map((x) => ({
          id: x.id,
          name: x.name
        })))

      } catch (error) {
        console.log('fail to fetch category list');
      }

    })()
  }, []);
  const handleCategoryClick = (item) => {
    const newCategory = {
      name: item.name
    }
    if (onChange) {
      onChange(newCategory)
    }
  }
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" className={classes.title}>Danh mục sản phẩm </Typography>
      <ul className={classes.menu}>
        {categoryList.map((item) => (
          <li key={item.id} onClick={() => { handleCategoryClick(item) }}>
            <Typography variant='body2'>{item.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;