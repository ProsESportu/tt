<script lang="ts">
    import MainTable from "$lib/MainTable.svelte";
    import SubstitutionsTable from "$lib/SubstitutionsTable.svelte";
    import type { PageServerData } from "./$types";

    let {
        data,
    }: {
        data: PageServerData;
    } = $props();
</script>

<MainTable table={data.table}></MainTable>

{#each data.substitutions as substitution}
    <SubstitutionsTable {substitution}></SubstitutionsTable>
{/each}
