import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/formControl/InputField';
import PasswordField from '../../../../components/formControl/PassworkField';
import { Avatar, Button, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '24px ',
    // marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: '0 auto',
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: '#dc004e',
  },
  title: {
    textAlign: 'center',
    margin: '16px 0 24px 0',
  },
  submit: {
    margin: '24px 0 16px 0 ',
  },
  progress: {
    position: 'absolute',
    top: '12px',
    left: '18px',
    right: '18px'
  }
}));

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please! Enter your Email.')
      .email('Please! enter a valid email address.'),
    password: yup
      .string()
      .required('Please! enter your Password.')
      .max(255, 'Password cannot be more than 255 characters.')
      .min(6, 'Must have at least 6 characters'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  // const { isSubmitting } = form.formState
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div>
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          // disabled={isSubmitting}
          type='submit'
          variant='contained'
        >Sign in</Button>
      </form>
    </div>
  );
}

export default LoginForm;