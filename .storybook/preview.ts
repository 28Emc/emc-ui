import type { Preview } from '@storybook/angular';
import '../projects/ui/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const theme = (context.globals as { theme?: string }).theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return storyFn();
    },
  ],
};

export default preview;
