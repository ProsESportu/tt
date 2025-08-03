// import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      strategies: "generateSW",
      srcDir: "src",
      manifest: {
        short_name: "tt",
        name: "Timetable",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#c026d3",
        background_color: "#c026d3",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    // devtoolsJson()
  ],
});
