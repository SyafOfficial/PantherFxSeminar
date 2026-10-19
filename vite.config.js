import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({base:'/PantherFxSeminar/',build:{rollupOptions:{input:{seminar:resolve(import.meta.dirname,'index.html'),homework:resolve(import.meta.dirname,'homework.html')}}}});
