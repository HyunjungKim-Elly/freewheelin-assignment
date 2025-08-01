import { defineConfig } from 'vite'
// @ts-ignore
import eslint from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})