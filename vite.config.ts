import { defineConfig } from 'vite';
import path  from 'path';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
//  引用mock
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv } from './src/utils/viteBuild';

const resolve = (dir: string) => path.join(__dirname, dir)

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	root: process.cwd(),
	resolve: {
    extensions: ['.js','.ts', '.vue'],
    alias: {
      '@': resolve('/src/'),
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      supportTs: false    // 关闭ts
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    })
  ],
	server: {
		host: '0.0.0.0',
		port: VITE_PORT,
		open: VITE_OPEN,
		proxy: {
      '/mock': {
				target: `http://localhost:${VITE_PORT}`,
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/mock/, ''),
			},
		},
	},
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		sourcemap: false,
	},
})
