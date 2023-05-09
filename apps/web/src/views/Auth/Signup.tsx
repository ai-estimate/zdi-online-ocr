import React from 'react';
import {db} from '@/src/db';
import {Header} from './Header';
import {
  ZDIIPhoneInput,
  ZDIInput,
  ZDIInputPassword,
} from '@/src/components/ZDIField';
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
      // Add the new user!
    } catch (error) {
      console.log('error::', error);
    }
  };

  const handleSignin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex min-h-full flex-col justify-center lg:pt-12">
      <Header label=" Sign up your account" />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white py-9 md:px-12 px-4 rounded-lg">
        <form
          className="space-y-4"
          action="#"
          // method="POST"
          onSubmit={handleSubmit}>
          <ZDIInput name="name" type="text" label="Name" required />

          <ZDIInput
            name="company-name"
            type="text"
            label="Company name"
            required
          />

          <ZDIInput
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
          />

          <ZDIIPhoneInput
            name="phone-number"
            type="number"
            autoComplete="false"
            label="Phone number"
            required
          />

          <ZDIInputPassword
            name="password"
            type="password"
            label="Password"
            required
          />

          <ZDIInputPassword
            name="re-password"
            type="password"
            label="Re-enter password"
            autoComplete="false"
            required
          />

          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign up
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
  );
};
