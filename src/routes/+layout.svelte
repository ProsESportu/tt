<script lang="ts">
    import "../app.css";
    import { DarkMode, } from "flowbite-svelte";
</script>
<div class="h-screen bg-white dark:bg-gray-800 flex flex-col">
    <DarkMode></DarkMode>
    <slot></slot>
</div>