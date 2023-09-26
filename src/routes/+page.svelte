<script lang="ts">
    import {
        Badge,
        Checkbox,
        Heading,
        Hr,
        Label,
        Table,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
    let isOnly = true;
</script>

<svelte:head>
    <title>{data.table.title}</title>
</svelte:head>
<Table hoverable={true} striped={true} shadow={true}>
    <TableHead>
        {#each data.table.head as header}
            <TableHeadCell>
                {header}
            </TableHeadCell>
        {/each}
    </TableHead>
    {#each data.table.lessons as row, index}
        <TableBodyRow>
            <TableBodyCell>
                {data.table.nrs[index]}
            </TableBodyCell>
            <TableBodyCell>
                <div class="sticky">{data.table.hours[index]}</div>
            </TableBodyCell>
            {#each row as cell}
                <TableBodyCell>
                    <div class="flex flex-col">
                        {#each cell as lesson}
                            <div class="flex justify-around items-center">
                                <p>{lesson.name}</p>
                                <div class="flex flex-col">
                                    <Badge
                                        href={`https://zsem.edu.pl/plany/plany/${lesson.teacher.link}`}
                                        class="m-2">{lesson.teacher.name}</Badge
                                    >
                                    <Badge
                                        href={`https://zsem.edu.pl/plany/plany/${lesson.classroom.link}`}
                                        class="m-2"
                                        >{lesson.classroom.name}</Badge
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
                </TableBodyCell>
            {/each}
        </TableBodyRow>
    {/each}
</Table>
<Hr
    hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
/>
<div class="flex m-4">
    <Checkbox bind:checked={isOnly} id="filter" />
    <Label for="filter">3p</Label>
</div>
{#each data.substitutions as substitution}
    <div>
        <Heading>{substitution.head}</Heading>
        <Hr />
        <Table striped={true} shadow={true} hoverable={true}>
            <TableHead>
                {#each substitution.headers as head}
                    <TableHeadCell>{head}</TableHeadCell>
                {/each}
            </TableHead>
            {#each substitution.rows.filter( (e) => (isOnly ? e[2]?.match(/3p/gmi) : true) ) as row}
                <TableBodyRow>
                    {#each row as cell}
                        <TableBodyCell>
                            {cell}
                        </TableBodyCell>
                    {/each}
                </TableBodyRow>
            {/each}
        </Table>
    </div>
{/each}
