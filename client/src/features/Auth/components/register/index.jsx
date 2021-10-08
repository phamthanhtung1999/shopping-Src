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

    const action = register(values)
    const resultAction = await dispatch(action);
    const data = unwrapResult(resultAction);

    if (!data.error) {
      enqueueSnackbar("Login success", { variant: "success" })
    } else {
      enqueueSnackbar(data.message, { variant: "error" })
    }
    // close dialog
    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
    // do something here


  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;