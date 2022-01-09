<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let title: string;

    const dispatch = createEventDispatcher();
    const closeModal = () => {
        dispatch("close");
    };
</script>

<div class="fixed inset-0 bg-gray-900/60 z-40" transition:fade>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div
            class="bg-white rounded-lg overflow-hidden max-w-lg"
            transition:fly={{ y: 50 }}
        >
            <div class="flex flex-row items-start justify-between px-5 py-4">
                <h1 class="text-2xl font-medium text-gray-700">
                    {title}
                </h1>
                <button
                    class="p-1 rounded-lg hover:bg-gray-100 text-gray-700 -mr-3 -mt-2"
                    on:click={closeModal}
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
            <slot />
        </div>
    </div>
</div>
