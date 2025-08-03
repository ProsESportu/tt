<script lang="ts">
    import type { PageData } from "./$types";
    import MainTable from "$lib/MainTable.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
</script>

<MainTable table={data.table}></MainTable>
