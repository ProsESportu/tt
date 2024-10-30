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
        P,
        TableBody,
    } from "flowbite-svelte";
    import type { lessons } from "./types";
    export let table: lessons;
</script>

<svelte:head>
    <title>{table.title}</title>
</svelte:head>
<div class="flex justify-center items-center max-w-full flex-wrap">
    <P size="6xl">{table.title?.split(" ")[0]}</P>
    <Badge class="m-4" href={table.url}
        >{new Intl.DateTimeFormat("pl-PL", {
            timeStyle: "medium",
            dateStyle: "short",
        }).format(table.ts)}</Badge
    >
</div>
<Table hoverable={true} striped={true} shadow={true}>
    <TableHead>
        {#each table.head as header}
            <TableHeadCell>
                {header}
            </TableHeadCell>
        {/each}
    </TableHead>
    <TableBody>
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
                                                href={`/process/${encodeURI(
                                                    lesson.clas.link,
                                                )}`}
                                                class="m-2"
                                                >{lesson.clas.name}</Badge
                                            >
                                        {/if}
                                        {#if lesson.teacher}
                                            <Badge
                                                href={`/process/${encodeURI(
                                                    lesson.teacher.link,
                                                )}`}
                                                class="m-2"
                                                >{lesson.teacher.name}</Badge
                                            >
                                        {/if}
                                        {#if lesson.classroom}
                                            <Badge
                                                href={`/process/${encodeURI(
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
    </TableBody>
</Table>
<!-- <Button href={table.url}>Get raw</Button> -->
<Hr
    hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
/>
