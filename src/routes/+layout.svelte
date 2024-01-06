<script lang="ts">
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
        Badge,
        Select,
    } from "flowbite-svelte";
    import { pwaInfo } from "virtual:pwa-info";
    import { browser } from "$app/environment";
    export let data: LayoutServerData;
    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";
    let modalOpen = false;
    let theme = browser
        ? localStorage.getItem("theme") || "fuchsia"
        : "fuchsia";
    $: {
        if (browser) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }
    const refreshIcon = `<svg
                class="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                />
            </svg>`;
    function refresh(event: SubmitEvent) {
        const form_data = new FormData(event.target as HTMLFormElement);
        const token = form_data.get("token");
        if (token) {
            document.cookie = `__prerender_bypass=${token}; path=/;${new Date(
                Date.now() + 1000 * 30,
            ).toUTCString()}`;
        }
    }
</script>

<svelte:head>
    <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
    <meta name="theme-color" content="#c026d3" />
    {@html webManifestLink}
</svelte:head>
<div class="bg-white dark:bg-gray-800">
    <Navbar let:hidden let:toggle fluid={true}>
        <DarkMode />
        <NavHamburger on:click={toggle} />
        <Button on:click={() => (modalOpen = true)}>{@html refreshIcon}</Button>
    </Navbar>
    <Modal bind:open={modalOpen}>
        <Heading>Insert refresh token</Heading>
        <form action="/" on:submit={refresh}>
            <Label>Isr refresh token:</Label>
            <Input name="token" type="text" />
            <!-- <Button type="submit">{@html refreshIcon}</Button> -->
        </form>
        <Badge
            >{new Intl.DateTimeFormat("pl-PL", {
                timeStyle: "medium",
                dateStyle: "short",
            }).format(data.ts)}</Badge
        >
        <Select
            bind:value={theme}
            items={Object.keys(colors).map((e) => {
                return { value: e, name: e };
            })}
        />
    </Modal>
    <slot />
</div>
