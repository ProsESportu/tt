<script lang="ts">
    import type { PageData } from "./$types";
    import MainTable from "$lib/MainTable.svelte";

    export let data: PageData;
</script>

<MainTable table={data.table}></MainTable>
