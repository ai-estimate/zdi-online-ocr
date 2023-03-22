import {ActionIcon, Title} from '@mantine/core';

export function LogoText(props: JSX.IntrinsicElements['svg']) {
  return (
    <Title order={5} underline={false} color="#000">
      ZDI Chatbot AI
    </Title>
  );
}

export function Logo(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 117"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117 26.7A26.7 26.7 0 0 0 90.3 0H27.09A26.7 26.7 0 0 0 .38 26.7v63.23a26.7 26.7 0 0 0 26.7 26.7h66.74a23.18 23.18 0 0 0 23.19-23.19V26.7ZM35.5 70.26V11.24h-8.42A15.46 15.46 0 0 0 11.62 26.7v43.56h23.89ZM11.63 81.5h59.02v23.89H27.08a15.46 15.46 0 0 1-15.46-15.46V81.5Zm94.14-46.37H46.74V11.24h43.57c8.53 0 15.45 6.92 15.45 15.46v8.43Zm-23.88 70.25V46.37h23.88v47.07c0 6.6-5.34 11.95-11.94 11.95H81.88Z"
        fill="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={59}
          y1={-12.54}
          x2={59}
          y2={116.46}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#41E094" />
          <stop offset={1} stopColor="#27B882" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <ActionIcon variant="filled" color="indigo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 256 199"
        width="1.25rem"
        height="1.25rem"
        {...props}>
        <path
          fill="currentColor"
          d="M216.856 16.597A208.5 208.5 0 00164.042 0c-2.275 4.113-4.933 9.646-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.807 207.807 0 00-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.13 161.13 0 0079.735 175.3a136.374 136.374 0 01-21.846-10.632 108.542 108.542 0 005.356-4.237c42.122 19.702 87.89 19.702 129.51 0 1.751 1.46 3.543 2.88 5.355 4.237a136.011 136.011 0 01-21.886 10.653c4.006 8.02 8.638 15.671 13.873 22.848 21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.288-9.081-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18z"></path>
      </svg>
    </ActionIcon>
  );
}
