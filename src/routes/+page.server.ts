import type { PageServerLoad } from './$types';
import { fetchTable, fetchSubstitutions } from '../lib/lib';
export const load = (async (e) => {
    const [table, substitutions] = await Promise.all([fetchTable(), fetchSubstitutions()]);

    return { table, substitutions };
}) satisfies PageServerLoad;
