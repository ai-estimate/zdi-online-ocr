export const Footer = () => {
  return (
    <footer className="flex flex-col justify-between space-y-1.5 text-gray-500 text-sm text-center sm:flex-row sm:space-y-0 sm:text-justify">
      <p>Copyright © 2021 Setti. All rights reserved.</p>
      <p>
        Images from{' '}
        <a
          className="text-blue-500"
          href="https://unsplash.com"
          rel="nofollow"
          target="_blank">
          unsplash.com
        </a>{' '}
        and{' '}
        <a
          className="text-blue-500"
          href="https://www.freepik.com/vectors/background">
          freepik.com
        </a>
      </p>
    </footer>
  );
};
