import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  legacy: {
    // Vite 8 changed CJS default import interop (Rolldown).
    // react-countup is currently affected, causing "Element type is invalid" in dev.
    // This restores the Vite 7 interop behavior while keeping latest Vite.
    inconsistentCjsInterop: true,
  },
})
