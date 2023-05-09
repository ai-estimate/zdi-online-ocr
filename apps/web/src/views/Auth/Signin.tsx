import React from 'react';
import {Stack} from '@mui/material';
import {useRouter} from 'next/router';
import {ZDIInput} from '@/src/components/ZDIField';
import {Header} from './Header';
import {db} from '@/src/db';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Signin: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // router.push('/');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Header label="Sign in to your account" />
        <div className="flex flex-col ">
          <div className="mt-10 sm:mx-auto sm:w-full md:max-w-lg md:py-9 md:bg-white md:px-9 rounded-md  ">
            <form
              className="space-y-6"
              action="#"
              // method="POST"
              onSubmit={handleSubmit}>
              <ZDIInput
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
              />

              <div>
                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out "
                    />
                    <label
                      htmlFor="remember_me"
                      className="block ml-2 text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                      Forgot your password?
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="registration gap-1 ">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form
                  className="space-y-3"
                  action="#"
                  // method="POST"
                  onSubmit={handleSubmit}>
                  <div className="flex justify-between gap-2">
                    <button
                      className={
                        StyledButton +
                        ' bg-blue-500 text-white hover:bg-blue-700'
                      }>
                      <FacebookIcon /> Facebook
                    </button>
                    <button
                      className={
                        StyledButton + ' bg-red-500 text-white hover:bg-red-700'
                      }>
                      <GoogleIcon /> Google
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                onClick={handleSignup}
                className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Signup for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </Stack>
  );
};

const StyledButton =
  'flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 gap-3';
