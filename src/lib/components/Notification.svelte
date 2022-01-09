<script lang="ts">
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    export let notificationMessage: string;
    export let notificationType: "error" | "info" | "success";
    const dispatch = createEventDispatcher();
</script>

<div
    class="fixed bottom-4 right-4 left-4 p-4 sm:left-auto sm:w-96 shadow-xl rounded-lgq flex flex-row items-center z-50"
    class:bg-red-500={notificationType === "error"}
    class:bg-slate-500={notificationType === "info"}
    class:bg-green-500={notificationType === "success"}
    transition:fade={{ duration: 200 }}
>
    <div class="flex-shrink-0 text-white mr-2">
        {#if notificationType === "success"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        {:else if notificationType === "info"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        {/if}
    </div>
    <div class="flex-1 text-white font-medium">{notificationMessage}</div>
    <button
        class="p-2 hover:bg-gray-500/40 roundex-lg text-white"
        on:click={() => {
            dispatch("close");
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>
</div>
