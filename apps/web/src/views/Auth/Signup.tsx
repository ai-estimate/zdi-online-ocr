import React from 'react';
import {Header} from './Header';
import {
  ZDIIPhoneInput,
  ZDIInput,
  ZDIInputPassword,
} from '@/src/components/ZDIField';
import {Stack} from '@mui/material';
import {useRouter} from 'next/router';
import {z1DataApi as z1DataAPI} from 'lib/Apis';
import useState from '@/src/hooks/useState';

export const Signup: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState({
    error: '',
    touched: false,
    errEmail: '',
    errPhone: '',
  });

  const {error, touched, errEmail, errPhone} = state;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    var phonePlus = data.get('phone');

    if (phonePlus) {
      phonePlus = phonePlus.toString();
      if (phonePlus.charAt(0) !== '+') {
        phonePlus = '+' + phonePlus;
      }
    }

    const field = {
      name: data.get('name'),
      companyName: data.get('company-name'),
      email: data.get('email'),
      phone: phonePlus,
      password1: data.get('password1'),
      password2: data.get('password2'),
    };
    console.log('field::', field);

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
      const {data} = await z1DataAPI.register(field);
      router.replace('/signin');
    } catch (error) {
      console.log('error::', error);
      if (error.response?.data.email) {
        setState({
          errEmail: error.response.data.email[0],
          touched: true,
        });
      }
      if (error.response?.data.phone) {
        setState({
          errPhone: error.response.data.phone[0],
          touched: true,
        });
      }
    }
  };

  const handleSignin = () => {
    router.replace('/signin');
  };

  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Header label=" Sign up your account" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white py-9 md:px-12 px-4 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              touched={touched}
              error={errEmail}
            />

            <ZDIIPhoneInput
              name="phone"
              type="string"
              autoComplete="false"
              label="Phone number"
              required
              value="+855"
              placeholder="+855"
              touched={touched}
              error={errPhone}
            />

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
    </Stack>
  );
};
