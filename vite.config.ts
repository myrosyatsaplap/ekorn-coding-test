import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	/* Testing Library mounts components; Svelte must resolve the browser build, not SSR. */
	resolve: process.env.VITEST
		? {
				conditions: ['browser', 'development', 'module']
			}
		: undefined,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts']
	}
});
