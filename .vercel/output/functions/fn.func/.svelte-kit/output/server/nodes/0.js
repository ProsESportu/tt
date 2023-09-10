

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.7844283c.js","_app/immutable/chunks/scheduler.58203244.js","_app/immutable/chunks/index.f4dee318.js","_app/immutable/chunks/tw-merge.786e75a4.js"];
export const stylesheets = ["_app/immutable/assets/0.bab09087.css"];
export const fonts = [];
