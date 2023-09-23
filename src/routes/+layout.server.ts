import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async () => {
    return {ts:new Date()}
};