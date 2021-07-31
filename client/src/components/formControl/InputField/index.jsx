import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';


function InputField(props) {
  const { form, name, label, disabled } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  // console.log(errors[name], touchedFields[name]); 
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!hasError}
          disabled={disabled}
          helperText={errors[name]?.message}
          fullWidth
          variant="outlined"
          margin="dense"
        />
      )}
    ></Controller>
  );
}

export default InputField;
