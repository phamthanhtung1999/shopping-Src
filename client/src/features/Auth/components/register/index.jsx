import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../registerFrom/index';
import { unwrapResult } from '@reduxjs/toolkit';

import { register } from 'features/Auth/userSlice';
import { useSnackbar } from '../../../../../node_modules/notistack/dist/index';
import { useDispatch } from 'react-redux';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const action = register(values)
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      // do something here
      enqueueSnackbar("Register is successfully", { variant: "success" })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;