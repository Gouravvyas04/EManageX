import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: "dist", // Ensure build files go into the correct directory
  //   assetsDir: "assets", // Keeps assets organized
  // },
  // server: {
  //   port: 3000, // Optional: Set a local dev port
  // },
});
