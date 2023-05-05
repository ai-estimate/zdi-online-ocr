import React from 'react';
import {Button, Stack, TextField} from '@mui/material';
import {db} from '@/src/db';
import {Header} from './Header';
import {ZDIInput} from '@/src/components/ZDIField';
import {useRouter} from 'next/router';

export const Signup: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log('data::', data);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      // Add the new friend!
      await db.users.add({
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('first-name'),
        lastName: data.get('last-name'),
        phoneNumer: data.get('phone-number'),
      });
    } catch (error) {
      console.log('error::', error);
    }
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
        <Header label=" Sign in to your account" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            // method="POST"
            onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row">
              <ZDIInput name="first-name" type="text" label="First name" />
              <ZDIInput name="last-name" type="text" label="Last name" />
            </Stack>

            <ZDIInput
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
            />

            <ZDIInput name="phone-number" type="text" label="Phone number" />
            <div>
              <div className="flex items-center justify-between">
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
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
