import type { Preview } from '@storybook/react'
import '../src/stories/assets/index.css'
import '@ant-design/v5-patch-for-react-19';

const preview: Preview = {
  parameters: {
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