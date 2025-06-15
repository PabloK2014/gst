import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Изменили с '' на '/'
  server: {
    host: true,  // Для доступа с других устройств в локальной сети
  },
  build: {
    outDir: 'dist',  // Явно указываем выходную директорию
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',  // Добавили хеш для кэширования
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})
