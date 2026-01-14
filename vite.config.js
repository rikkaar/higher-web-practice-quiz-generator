import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
	root: './src',
	base: './',
	server: {
		port: 4173,
		open: true,
	},
	resolve: {
		alias: {
			'@': resolve(import.meta.dirname, './src'),
		},
	},
	build: {
		outDir: resolve(import.meta.dirname, './dist'),
		emptyOutDir: true,
		rolldownOptions: {
			input: {
				main: resolve(import.meta.dirname, './src/index.html'),
				quizzes: resolve(import.meta.dirname, './src/quizzes.html'),
				quiz: resolve(import.meta.dirname, './src/quiz.html'),
			},
		},
	},
	optimizeDeps: {
		include: ['zod', 'idb', 'nanoid'],
	},
})
