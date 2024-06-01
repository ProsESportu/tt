import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { purgeCss } from "vite-plugin-tailwind-purgecss";
export default defineConfig({
	plugins: [sveltekit(),
	// purgeCss(),
	SvelteKitPWA({
		strategies: "generateSW",
		srcDir: "src",
		manifest: {
			short_name: 'tt',
			name: 'Timetable',
			start_url: '/',
			scope: '/',
			display: 'standalone',
			theme_color: "#c026d3",
			background_color: "#c026d3",
			icons: [
				{
					src: '/pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		}
	})],
});
