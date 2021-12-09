import '../src/index.scss';
import '@storybook/addon-console';
import StoreProvider from '../src/context/store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <StoreProvider>
      <Story />
    </StoreProvider>
  ),
];
