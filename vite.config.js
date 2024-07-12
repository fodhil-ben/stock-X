import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // const env = loadEnv(mode, process.cwd());
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};


    return {
        plugins: [
            laravel({
                input: 'resources/js/app.jsx',
                refresh: true,
            }),
            react(),
        ],
        define: {
          'process.env': {
            ...process.env
          },
        },
        server: {
          host: true,
          port: env.VITE_REVERB_PORT || 3000,
        }
      };

});
