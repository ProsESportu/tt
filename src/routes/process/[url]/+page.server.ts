import type { PageServerLoad } from "./$types";
import { fetchTable } from "$lib/lib";
import { PROTOCOL } from "$lib/data";

export const load = (async (e) => {
  const link = e.params.url;
  const table = await fetchTable(
    `${PROTOCOL}://zsem.edu.pl/plany/plany/${link}`,
  );

  return {
    table,
  };
}) satisfies PageServerLoad;
