import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/formControl/InputField';
import PasswordField from '../../../../components/formControl/PassworkField';
import { Avatar, Button, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


RegisterForm.propTypes = {
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

function RegisterForm(props) {
  const classes = useStyles();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('Please! Enter your FirstName.')
      .max(32, 'FirstName cannot be more than 32 characters.'),
    lastName: yup
      .string()
      .required('Please! Enter your LastName.')
      .max(32, 'LastName cannot be more than 32 characters.'),
    password: yup
      .string()
      .required('Please! enter your Password.')
      .max(255, 'Password cannot be more than 255 characters.')
      .min(6, 'Must have at least 6 characters'),
    retypepassword: yup
      .string()
      .required('Please!retype your Password')
      .oneOf([yup.ref('password')], "Passwords don't match."),
    email: yup
      .string()
      .required('Please! Enter your Email.')
      .email('Please! enter a valid email address.'),
    address: yup
      .string()
      .required('Please! Enter your Address.'),
    phone: yup
      .string()
      .required('Please! Enter your Phone.')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retypepassword: '',
      address: '',
      phone: '',
    },
    resolver: yupResolver(schema),
  });
  // const { isSubmitting } = useFormState();
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
        Register
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="firstName" label="FirstName" form={form} />
        <InputField name="lastName" label="LastName" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypepassword" label="RetypePassword" form={form} />
        <InputField name="address" label="Address" form={form} />
        <InputField name="phone" label="Phone" form={form} />
        <Button
          // disabled={isSubmitting}
          type='submit'
          variant='contained'
        >Create Acount</Button>
      </form>
    </div>
  );
}

export default RegisterForm;