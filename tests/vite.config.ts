import { defineConfig } from 'vite';
import viteDevLogger from '../src';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ viteDevLogger()],
    server : {
        port: 4000,
    },
});
