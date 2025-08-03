import type { PageServerLoad } from './$types';
import { fetchTable } from "$lib/lib";

export const load = (async (e) => {
    const link = e.params.url;
    const table = await fetchTable(`https://zsem.edu.pl/plany/plany/${link}`);

    return {
        table
    };
}) satisfies PageServerLoad;