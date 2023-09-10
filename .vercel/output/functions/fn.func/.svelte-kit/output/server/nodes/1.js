

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.50448d69.js","_app/immutable/chunks/scheduler.58203244.js","_app/immutable/chunks/index.f4dee318.js","_app/immutable/chunks/singletons.6f1a5dfd.js"];
export const stylesheets = [];
export const fonts = [];
