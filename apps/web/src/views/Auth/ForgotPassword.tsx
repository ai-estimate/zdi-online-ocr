import React from 'react';
import {Alert, Link, Stack} from '@mui/material';
import {ZDIInput} from '@/src/components/ZDIField';
import {useRouter} from 'next/router';
import {Header} from './Header';
import {z1DataApi} from '@/lib/Apis';

export const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [done, setDone] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get('email')) {
      return;
    }
    // eslint-disable-next-line no-console
    const field = Object.fromEntries(data.entries());
    const params = {
      ...field,
      redirect_url: location.origin,
    };
    try {
      await z1DataApi.forgotPassword(params);
      setDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = () => {
    router.push('/signin');
  };

  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Header label="Forgot your password?" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {done ? (
            <DoneSent />
          ) : (
            <form
              className="space-y-6"
              // method="POST"
              onSubmit={handleSubmit}>
              <ZDIInput
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Send password reset email
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            already have an account?{' '}
            <a
              onClick={handleSignin}
              className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </Stack>
  );
};

const DoneSent = React.memo(() => {
  return (
    <Alert severity="success">
      We have sent you an e-mail. Please contact us if you do not receive it
      within a few minutes.
      <Link href="/signin">Sign In</Link>
    </Alert>
  );
});
