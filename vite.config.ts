import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@config': path.resolve(__dirname, './src/config'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@api': path.resolve(__dirname, './src/api'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
})
