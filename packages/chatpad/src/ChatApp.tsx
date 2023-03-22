import React from 'react';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useHotkeys, useLocalStorage} from '@mantine/hooks';
import {Layout} from './components/Layout';
import {Notifications} from '@mantine/notifications';

let window = {matchMedia: () => {}} as any;
if (typeof window !== 'undefined') {
  window = window;
}
interface IProps {
  children: React.ReactNode;
}
export const ZDIChatApp: React.FC<IProps> = ({children}) => {
  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  )?.matches;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: prefersDark ? 'dark' : 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        withCSSVariables
        theme={{
          colorScheme,
          primaryColor: 'teal',
          globalStyles: (theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[0],
            },
          }),
          components: {
            Modal: {
              defaultProps: {
                padding: 'xl',
              },
              styles: {
                title: {
                  fontSize: '1.2rem',
                  fontWeight: 600,
                },
              },
            },
            ModalRoot: {
              defaultProps: {
                centered: true,
              },
            },
            Overlay: {
              defaultProps: {
                opacity: 0.6,
                blur: 6,
              },
            },
            // Input: {
            //   defaultProps: {
            //     variant: "filled",
            //   },
            // },
            InputWrapper: {
              styles: {
                label: {
                  marginBottom: 4,
                },
              },
            },
          },
        }}>
        <Layout />
        <Notifications />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
