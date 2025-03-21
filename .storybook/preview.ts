import type { Preview } from '@storybook/react'
import '../src/stories/assets/index.css'
import '@ant-design/v5-patch-for-react-19';
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs']
};

export default preview;