import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Snackbar,
  Stack,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import {Form, FormRenderProps, Field} from 'react-final-form';
import Link from 'next/link';
import {z1DataApi} from 'lib/Apis';
import {useRouter} from 'next/router';
import nProgress from 'nprogress';
import {FORM_ERROR} from 'final-form';
import useStates from '@/src/hooks/useState';
import {ZDIInputPassword} from '@/src/components/ZDIField';
import {Header} from './Header';

const ResetPassword = React.memo(() => {
  const router = useRouter();
  const query: any = router.query;
  const [state, setState]: any = useStates({
    token_fail: false,
    loading: true,
    pwdChanged: false,
    error: '',
    touched: false,
  });
  const {token_fail, pwdChanged, loading, error, touched} = state;
  const tokenKey = query?.key ? query?.key[0] : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nProgress.start();
    const _data = new FormData(event.currentTarget);
    const field = {
      password1: _data.get('password1'),
      password2: _data.get('password2'),
    };

    try {
      if (field.password1 !== field.password2) {
        setState({
          error: 'Password mismatch',
          touched: true,
        });
        throw new Error('Password mismatch');
      } else {
        setState({
          error: '',
          touched: false,
        });
      }

      const {data} = await z1DataApi.changePasswordResetLink(tokenKey, field);
      nProgress.done();
      setState({pwdChanged: true});
      setTimeout(() => {
        router.replace('/signin');
      }, 1500);
    } catch (err) {
      const errors = err?.response?.data;
      if (errors?.__all__) {
        return {[FORM_ERROR]: errors?.__all__};
      }
      nProgress.done();
      if (errors) return errors;
    }
  };

  const handleValidateLink = async () => {
    try {
      nProgress.start();
      await z1DataApi.checkPasswordResetLink(tokenKey);
      setState({token_fail: false, loading: false});
    } catch (err) {
      setState({token_fail: true, loading: false});
    }
    nProgress.done();
  };

  React.useEffect(() => {
    if (tokenKey) {
      handleValidateLink();
    }
  }, [tokenKey]);

  const handleClose = (form: any) => () => {
    form.change('_hidden', `${+new Date()}`);
  };

  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Header label=" Reset password " />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white py-9 md:px-12 px-4 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <ZDIInputPassword
              name="password1"
              type="password"
              label="Password"
              required
            />

            <ZDIInputPassword
              name="password2"
              type="password"
              label="Re-enter password"
              autoComplete="false"
              required
              touched={touched}
              error={error}
            />

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={token_fail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          <BadToken />
        </Alert>
      </Snackbar>
      <Snackbar open={pwdChanged} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Password changed successfully. Redirecting to sign in page...
        </Alert>
      </Snackbar>
    </Stack>
  );
});

const BadToken = React.memo(() => {
  return (
    <div>
      <h3>Bad Token</h3>
      The password reset link was invalid, possibly because it has already been
      used. Please request a{' '}
      <Link
        href="/forgot-password"
        passHref
        className="text-blue-500 hover:underline">
        new password reset
      </Link>
      .
    </div>
  );
});

export default ResetPassword;
