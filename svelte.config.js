import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: vercel(),
		alias: {
			$components: 'src/lib/components',
			$assets: 'src/assets'
		}
	}
};
