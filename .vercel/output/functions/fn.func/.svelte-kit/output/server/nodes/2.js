import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.7c295fa9.js","_app/immutable/chunks/scheduler.58203244.js","_app/immutable/chunks/index.f4dee318.js","_app/immutable/chunks/tw-merge.786e75a4.js"];
export const stylesheets = [];
export const fonts = [];
