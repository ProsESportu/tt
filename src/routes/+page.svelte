<script lang="ts">
    import MainTable from "$lib/MainTable.svelte";

    import SubstitutionsTable from "$lib/SubstitutionsTable.svelte";

    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<MainTable table={data.table}></MainTable>
<SubstitutionsTable substitutions={data.substitutions}></SubstitutionsTable>
