<script lang="ts">
    import {
        Checkbox,
        Heading,
        Hr,
        Label,
        // Table,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
        Badge,
        TableBody,
    } from "flowbite-svelte";
    import type { substitutions } from "./types";
    interface Props {
        substitution: substitutions[number];
    }

    let { substitution }: Props = $props();
    let isOnly = $state(true);
    let searchTerm = $state("");
</script>

<div class="flex m-4">
    <Checkbox bind:checked={isOnly} id="filter" />
    <Label for="filter">3p</Label>
    <Badge class="mx-4"
        >{new Intl.DateTimeFormat("pl-PL", {
            timeStyle: "medium",
            dateStyle: "short",
        }).format(substitution.ts)}</Badge
    >
</div>
<div>
    <Heading>{substitution.head}</Heading>
    <Hr />
    <TableSearch striped={true} hoverable={true} bind:inputValue={searchTerm}>
        <TableHead>
            {#each substitution.headers as head}
                <TableHeadCell>{head}</TableHeadCell>
            {/each}
        </TableHead>
        <TableBody>
            {#each substitution.rows
                .filter((e) => (isOnly ? e[2]?.match(/3p/gim) : true))
                .filter((e) => e.some((f) => f
                                .toLowerCase()
                                .indexOf(searchTerm.toLowerCase()) != -1)) as row}
                <TableBodyRow>
                    {#each row as cell}
                        <TableBodyCell>
                            {cell}
                        </TableBodyCell>
                    {/each}
                </TableBodyRow>
            {/each}
        </TableBody>
    </TableSearch>
</div>
