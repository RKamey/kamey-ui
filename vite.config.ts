import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwind from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
      rollupTypes: true
    }),
    // visualizer({ open: true })
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
        '@tanstack/react-query',
        'axios',
        'dayjs',
        'jspdf',
        'jspdf-autotable',
        'xlsx',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          '@tanstack/react-query': 'ReactQuery',
          axios: 'axios',
          dayjs: 'dayjs',
          jspdf: 'jsPDF',
          'jspdf-autotable': 'jspdfAutoTable',
          xlsx: 'XLSX',
        },
      }
    },
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});