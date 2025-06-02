import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // Đây là dòng tôi thêm vào
  build: {
    outDir: 'dist'
  },
});
