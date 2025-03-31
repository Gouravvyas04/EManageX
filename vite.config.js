import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/EManageX/", // Ensure base path is set correctly
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
    historyApiFallback: true, // This helps with React Router issues in local dev mode
  },
});
