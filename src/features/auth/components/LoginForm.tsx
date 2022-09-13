import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import CheckboxField from 'components/FormFields/CheckboxField';
import { LoginPayload } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface LoginFormProps {
  initialValues?: LoginPayload;
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup.object().shape({
  rememberMe: yup.boolean(),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  username: yup.string().required('Vui lòng nhập tên tài khoản'),
});

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const error = useAppSelector((state) => state.auth.error);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: LoginPayload) => {
    await onSubmit?.(formValues);
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="username" control={control} label="Tài khoản" type="text" />
        <InputField name="password" control={control} label="Mật khẩu" type="password" />
        <CheckboxField name="rememberMe" control={control} label="Tự động đăng nhập" />
        {error && <Alert severity="error">{error}</Alert>}
        {!error && error?.length === 0 && <Alert severity="success">Đăng nhập thành công</Alert>}
        <Box mt={3}>
          {!isLoading && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Đăng nhập
            </Button>
          )}
          {isLoading && <CircularProgress size={30} />}
        </Box>
      </form>
    </Box>
  );
}
