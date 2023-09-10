<script lang="ts">
    import {
<<<<<<< HEAD
        Badge,
=======
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
        Checkbox,
        Heading,
        Hr,
        Label,
        Table,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
<<<<<<< HEAD
    } from "flowbite-svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
    let isOnly = false;
=======
        TableSearch,
    } from "flowbite-svelte";
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
    let isOnly=true
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
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
<<<<<<< HEAD
                    <div class="flex flex-col">
                        {#each cell as lesson}
                            <div class="flex justify-around items-center">
                                <p>{lesson.name}</p>
                                <div class="flex flex-col">
                                    <Badge
                                        href={`https://zsem.edu.pl/plany/plany/${lesson.teacher.link}`}
                                        class="m-2"
                                        >{lesson.teacher.name}</Badge
                                    >
                                    <Badge
                                        href={`https://zsem.edu.pl/plany/plany/${lesson.classroom.link}`}
                                        >{lesson.classroom.name}</Badge
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
=======
                    {#each cell as lesson}
                        {lesson.name}
                    {/each}
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
                </TableBodyCell>
            {/each}
        </TableBodyRow>
    {/each}
</Table>
<<<<<<< HEAD
<Hr
    hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
/>
<div class="flex mx-4">
=======
<Hr hrClass="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
<div class="flex">
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
    <Checkbox bind:checked={isOnly} />
    <Label>3p</Label>
</div>
{#each data.substitutions as substitution}
    <div>
        <Heading>{substitution.head}</Heading>
<<<<<<< HEAD
        <Hr />
=======
        <Hr/>
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
        <Table>
            <TableHead>
                {#each substitution.headers as head}
                    <TableHeadCell>{head}</TableHeadCell>
                {/each}
            </TableHead>
<<<<<<< HEAD
            {#each substitution.rows.filter(e=>isOnly? e[1]==="3p":true) as row}
=======
            {#each substitution.rows as row}
>>>>>>> 2e030259fe92367af05ac958214548bb46426dad
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
