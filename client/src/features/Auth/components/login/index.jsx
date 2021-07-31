import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../loginForm';
import { useDispatch } from 'react-redux';
import { login } from 'features/Auth/userSlice';
import { unwrapResult } from '../../../../../node_modules/@reduxjs/toolkit/';
import { useSnackbar } from '../../../../../node_modules/notistack/dist/index';

Login.propTypes = {

};
function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log('fail to login', error);
      enqueueSnackbar(error.message, { variant: "error" })
    }
  }
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;