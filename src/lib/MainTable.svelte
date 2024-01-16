<script lang="ts">
    import {
        Badge,
        Hr,
        Table,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Button,
        P
    } from "flowbite-svelte";
    import type { lessons } from "./types";
    export let table: lessons;
</script>

<svelte:head>
    <title>{table.title}</title>
</svelte:head>
<P size="6xl">{table.title}</P>
<Table hoverable={true} striped={true} shadow={true}>
    <TableHead>
        {#each table.head as header}
            <TableHeadCell>
                {header}
            </TableHeadCell>
        {/each}
    </TableHead>
    {#each table.lessons as row, index}
        <TableBodyRow>
            <TableBodyCell>
                {table.nrs[index]}
            </TableBodyCell>
            <TableBodyCell class="sticky">
                {table.hours[index]}
            </TableBodyCell>
            {#each row as cell}
                <TableBodyCell>
                    <div class="flex flex-col">
                        {#each cell as lesson}
                            <div class="flex justify-around items-center">
                                <p>{lesson.name}</p>
                                <div class="flex flex-col">
                                    {#if lesson.clas}
                                        <Badge
                                            href={`/process?link=${encodeURI(
                                                lesson.clas.link,
                                            )}`}
                                            class="m-2"
                                            >{lesson.clas.name}</Badge
                                        >
                                    {/if}
                                    {#if lesson.teacher}
                                        <Badge
                                            href={`/process?link=${encodeURI(
                                                lesson.teacher.link,
                                            )}`}
                                            class="m-2"
                                            >{lesson.teacher.name}</Badge
                                        >
                                    {/if}
                                    {#if lesson.classroom}
                                        <Badge
                                            href={`/process?link=${encodeURI(
                                                lesson.classroom.link,
                                            )}`}
                                            class="m-2"
                                            >{lesson.classroom.name}</Badge
                                        >
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </TableBodyCell>
            {/each}
        </TableBodyRow>
    {/each}
</Table>
<Button href={table.url}>Get raw</Button>
<Hr
    hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
/>
