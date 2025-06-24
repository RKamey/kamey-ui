import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'KameyComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `kamey-components.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
        'axios',
        'dayjs'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          axios: 'axios',
          dayjs: 'dayjs'
        }
      }
    },
    sourcemap: true,
    minify: 'terser'
  }
});