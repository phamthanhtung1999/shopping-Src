import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../loginForm';
import { useDispatch } from 'react-redux';
import { login } from 'features/Auth/userSlice';
import { unwrapResult } from '../../../../../node_modules/@reduxjs/toolkit/';
import { useSnackbar } from '../../../../../node_modules/notistack/dist/index';

Login.propTypes = {
  closeDialog: PropTypes.func,
};
function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    const action = login(values);
    const resultAction = await dispatch(action);
    const data = unwrapResult(resultAction);

    if (!data.error) {
      enqueueSnackbar("Login success", { variant: "success" })
    } else {
      enqueueSnackbar(data.message, { variant: "error" })
    }

    //close dialog
    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
  }
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;