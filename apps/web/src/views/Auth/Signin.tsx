import React from 'react';
import {Stack} from '@mui/material';
import {useRouter} from 'next/router';
import {ZDIInput, ZDIInputPassword} from '@/src/components/ZDIField';
import {Header} from './Header';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useUser} from '@/lib/auth/useUser';
import {z1DataApi as z1DataAPI} from 'lib/Apis';
import nProgress from 'nprogress';

const Signin = React.memo(() => {
  const {setAuthToken} = useUser({unAuthenticated: true});
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    nProgress.start();
    event.preventDefault();
    const _data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    try {
      const {data}: any = await z1DataAPI.login(
        _data.get('email'),
        _data.get('password'),
      );
      setAuthToken(data);

      const _next: any = router?.query?._next;
      if (_next) {
        router.replace(_next);
        return;
      }
      router.push('/home');
      nProgress.done();
    } catch (error) {
      const errMessage = error?.message;
      console.log('errMessage::', errMessage);
      nProgress.done();
    }
  };

  const handleSignup = () => {
    router.replace('/signup');
  };

  const handleForgotPassword = () => {
    router.replace('/forgot-password');
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
          <div className="mt-10 sm:mx-auto sm:w-full md:max-w-xl md:py-9 md:bg-white md:px-9 rounded-md  ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <ZDIInput
                name="email"
                type="string"
                label="Email address or phone number"
                autoComplete="email"
              />

              <div>
                <ZDIInputPassword
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                />

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
                  // action="#"
                  method="POST"
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
});

export default Signin;

const StyledButton =
  'flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 gap-3';
