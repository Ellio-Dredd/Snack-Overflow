import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', //  backend port
    },
  },

  
});
