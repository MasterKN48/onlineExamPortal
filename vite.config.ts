/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      public: path.resolve(__dirname, './public/'),
    },
  },
  test: {
    environment: 'jsdom',
  },
  base: '/onlineExamPortal',
})
