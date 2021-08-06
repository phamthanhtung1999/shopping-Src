import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Fillter/FilterByCategory';

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};


function ProductFilter({ filters, onChange }) {
  const handleCategoryChange = (newCategory) => {
    if (!onChange) return;
    const newFilters = {
      category: newCategory.name
    }
    onChange(newFilters);
  }
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
    </Box>
  );
}

export default ProductFilter;