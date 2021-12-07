import '../src/index.scss';
import '@storybook/addon-console';
import StoreProvider from '../src/context/store';
import RootLayoutLayer from '../src/RootLayoutLayer';

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
      <RootLayoutLayer>
        <Story />
      </RootLayoutLayer>
    </StoreProvider>
  ),
];
