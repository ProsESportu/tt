<script lang="ts">
    import { page } from '$app/stores'
    import { Heading } from "flowbite-svelte";;
</script>

<Heading>{$page.status}: {$page.error?.message}</Heading>