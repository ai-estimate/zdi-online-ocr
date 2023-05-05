import React from 'react';
import {Stack} from '@mui/material';
import {ZDIInput} from '@/src/components/ZDIField';
import {useRouter} from 'next/router';
import {Header} from './Header';

export const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
    });
  };

  const handleSignin = () => {
    router.push('/auth/signin');
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
