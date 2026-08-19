import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      sitemap({
        hostname: env.VITE_SITE_URL || 'https://vinaykumar.dev',
        dynamicRoutes: ['/'],
        changefreq: 'monthly',
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0],
        generateRobotsTxt: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/',
    build: {
      target: 'es2015',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react':   ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion':  ['framer-motion'],
            'vendor-icons':   ['react-icons', 'lucide-react'],
            'vendor-emailjs': ['@emailjs/browser'],
            'vendor-helmet':  ['react-helmet-async'],
          },
          chunkFileNames:  'assets/js/[name]-[hash].js',
          entryFileNames:  'assets/js/[name]-[hash].js',
          assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 600,
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
  }
})
