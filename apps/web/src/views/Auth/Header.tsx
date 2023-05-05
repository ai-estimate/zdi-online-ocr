import React from 'react';

interface IProps {
  label: string;
}
export const Header = (props: IProps) => {
  const {label} = props;
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-15 w-auto"
        src="https://nextspell.com/logo.png"
        alt="ZDI Logo"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {label}
      </h2>
    </div>
  );
};
