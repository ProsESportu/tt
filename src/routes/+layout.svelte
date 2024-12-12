<script lang="ts">
    import { refreshIcon } from "$lib/data"

    import "../app.css";
    import type { LayoutServerData } from "./$types";
    import { colors } from "$lib/data";
    import {
        Button,
        DarkMode,
        Heading,
        Input,
        Label,
        Modal,
        NavHamburger,
        Navbar,
        Select,
        Spinner,
    } from "flowbite-svelte";
    import { pwaInfo } from "virtual:pwa-info";
    import { browser } from "$app/environment";
    import { navigating } from "$app/stores";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
    // export let data: LayoutServerData;
    let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");
    let modalOpen = $state(false);
    let theme = $state((browser
        ? localStorage.getItem("theme") || "fuchsia"
        : "fuchsia") as keyof typeof colors);
    $effect(()=>{
        if (browser) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    });

</script>

<svelte:head>
    <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
    <meta name="theme-color" content={colors[theme].primary[600]} />
    {@html webManifestLink}
</svelte:head>
<!-- <div class="bg-white dark:bg-gray-800"> -->
    <Navbar let:hidden let:toggle class={$navigating ? "fixed z-10 start-0 top-0" : ""}>
        <DarkMode />
        <NavHamburger on:click={toggle} />
        <Button on:click={() => (modalOpen = true)}>
            {#if $navigating}
                <Spinner color="white" size={6}/>
            {:else}
                {@html refreshIcon}
            {/if}
            </Button>
    </Navbar>
    <Modal bind:open={modalOpen}>
        <Heading>Insert refresh token</Heading>
        <form>
            <Label>Isr refresh token:</Label>
            <Input name="token" type="text" />
            <!-- <Button type="submit">{@html refreshIcon}</Button> -->
        </form>
        <Select
            bind:value={theme}
            items={Object.keys(colors).map((e) => {
                return { value: e, name: e };
            })}
        />
    </Modal>
    {#if $navigating}
        <div class="w-full h-16"></div>
    {/if}
    {@render children?.()}
<!-- </div> -->
