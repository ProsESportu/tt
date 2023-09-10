<script lang="ts">
    import {
        Checkbox,
        Heading,
        Hr,
        Label,
        Table,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
    } from "flowbite-svelte";
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
    let isOnly=true
</script>

<svelte:head>
    <title>{data.table.title}</title>
</svelte:head>
<Table hoverable={true}>
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
                {data.table.hours[index]}
            </TableBodyCell>
            {#each row as cell}
                <TableBodyCell>
                    {#each cell as lesson}
                        {lesson.name}
                    {/each}
                </TableBodyCell>
            {/each}
        </TableBodyRow>
    {/each}
</Table>
<Hr hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
<div class="flex">
    <Checkbox bind:checked={isOnly} />
    <Label>3p</Label>
</div>
{#each data.substitutions as substitution}
    <div>
        <Heading>{substitution.head}</Heading>
        <Hr/>
        <Table>
            <TableHead>
                {#each substitution.headers as head}
                    <TableHeadCell>{head}</TableHeadCell>
                {/each}
            </TableHead>
            {#each substitution.rows as row}
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
