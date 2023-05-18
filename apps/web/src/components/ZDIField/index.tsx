import React from 'react';
import useState from '@/src/hooks/useState';
import {styled} from '@mui/material/styles';

import Kh_4x3 from '@components/svgs/kh_4x3.svg';
import Kh_1x1 from '@components/svgs/kh_1x1.svg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Box} from '@mui/material';

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}
export const ZDIInput = (props: IInputFieldProps) => {
  const {
    label,
    name,
    type,
    autoComplete,
    required,
    className,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    disabled,
  } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-gray-900
        ${error && touched && 'text-red-500'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full rounded-md border-0 pl-2 pr-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            error && 'ring-red-400 focus:ring-2 focus:ring-red-600'
          }`}
        />
        {error && touched && (
          <span className="text-red-500 text-xs">{error}</span>
        )}
      </div>
    </div>
  );
};

export const ZDIInputPassword = (props: IInputFieldProps) => {
  const {
    label,
    name,
    type,
    autoComplete,
    required,
    className,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    disabled,
  } = props;

  const [state, setState] = useState({
    showPassword: false,
  });

  const {showPassword} = state;

  const handleShowPassword = () => {
    setState({
      showPassword: !showPassword,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className={`block text-sm font-medium leading-6 text-gray-900
        ${error && touched && 'text-red-500'}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="mt-2 relative">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type || 'password'}
          autoComplete={autoComplete}
          required
          className={`block w-full rounded-md border-0 pl-2 pr-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            error && 'ring-red-400 focus:ring-2 focus:ring-red-600'
          }`}
        />
        <i className="absolute right-2 top-1">
          {showPassword ? (
            <VisibilityOffIcon
              className="text-gray-400 cursor-pointer"
              onClick={handleShowPassword}
            />
          ) : (
            <VisibilityIcon
              className="text-gray-400 cursor-pointer"
              onClick={handleShowPassword}
            />
          )}
        </i>
        {error && touched && (
          <span className="text-red-500 text-xs">{error}</span>
        )}
      </div>
    </div>
  );
};

export const ZDIIPhoneInput = (props: IInputFieldProps) => {
  const {
    label,
    name,
    type,
    autoComplete,
    required,
    className,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    disabled,
  } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-gray-900
        ${error && touched && 'text-red-500'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 relative">
        <i className="absolute left-2 top-0">
          <ImproSvgStyled>
            <Kh_4x3 />
          </ImproSvgStyled>
        </i>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          defaultValue={value}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 pl-12 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            error && 'ring-red-400 focus:ring-2 focus:ring-red-600'
          }`}
        />
        {error && touched && (
          <span className="text-red-500 text-xs">{error}</span>
        )}
      </div>
    </div>
  );
};

const ImproSvgStyled = styled(Box)({
  svg: {
    width: '2.25rem !important',
    height: '2.25rem !important',
  },
});
