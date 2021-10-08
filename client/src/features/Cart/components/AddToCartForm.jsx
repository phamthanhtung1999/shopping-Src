import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/formControl/InputField';
import QuantityField from 'components/formControl/QuantityField';


import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {

  const schema = yup.object().shape({
    quantity: yup.number().required('please enter quantity !')
      .min(1, 'minimum value is 1!')
      .typeError("please enter a number"),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField name="quantity" label="Quantity" form={form} />
        <Button
          type="submit"
          variant="contained"
          style={{ width: "250px" }}
          size="large"
        >
          THÊM VÀO GIỎ HÀNG
        </Button>
      </form>
    </Box>
  );
}

export default AddToCartForm;