export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.17ea27bf.js","app":"_app/immutable/entry/app.074c3fe3.js","imports":["_app/immutable/entry/start.17ea27bf.js","_app/immutable/chunks/scheduler.58203244.js","_app/immutable/chunks/singletons.6f1a5dfd.js","_app/immutable/entry/app.074c3fe3.js","_app/immutable/chunks/scheduler.58203244.js","_app/immutable/chunks/index.f4dee318.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
