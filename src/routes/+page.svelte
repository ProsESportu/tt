<script lang="ts">
    import { Table, TableHead, TableHeadCell } from "flowbite-svelte";
</script>

<Table
    ><TableHead
        >{#each Array.from({length:10}).map(e=>Math.random().toFixed(3)) as el}
            <TableHeadCell>{el}</TableHeadCell>
        {/each}</TableHead
    ></Table
>
