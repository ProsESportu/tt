import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ cookies }) => {
    cookies.delete('token', { path: '/' });
    return { ts: new Date() }
};