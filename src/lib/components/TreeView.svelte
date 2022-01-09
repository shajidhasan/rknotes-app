<script lang="ts">
    import { slide } from "svelte/transition";
    import Loading from "$components/Loading.svelte";
    import {
        modalStore,
        noteStore,
        selectionStore,
        unsavedStore,
    } from "$stores";

    let folders: string[];

    $: {
        folders = [];
        if ($noteStore.loaded && !$noteStore.error) {
            for (const note of $noteStore.notes) {
                if (!folders.includes(note.folder)) {
                    folders.push(note.folder);
                }
            }
        }
    }
</script>

{#if $noteStore.loaded}
    {#each folders as folder}
        <div class="flex flex-row items-center px-2">
            <button
                class="tree-folder"
                class:selected={$selectionStore.currentlySelectedFolder ===
                    folder}
                on:click={() => {
                    $selectionStore.currentlySelectedFolder = folder;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                </svg>
                <p class="line-clamp-1 text-inherit">
                    {folder}
                </p>
            </button>
            {#if $selectionStore.currentlySelectedFolder === folder && folder !== "Random"}
                <button
                    on:click={() => {
                        $modalStore.renameFolderModal = true;
                    }}
                    class="icon-btn-mute text-primary-600"
                    ><svg
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </button>
                <button
                    on:click={() => {
                        $modalStore.deleteFolderModal = true;
                    }}
                    class="icon-btn-mute text-red-600"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            {/if}
        </div>

        {#if $selectionStore.currentlySelectedFolder === folder}
            <div class="px-2 py-1 ml-4 space-y-1" transition:slide|local>
                {#each $noteStore.notes.filter((note) => note.folder === folder) as note}
                    <div class="flex flex-row items-center">
                        <button
                            on:click={() => {
                                $selectionStore.currentlySelectedNote = note;
                            }}
                            class="tree-note"
                            class:selected={$selectionStore.currentlySelectedNote ===
                                note}
                            class:unsaved={$unsavedStore[note.id]}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 mr-2 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p
                                class="line-clamp-1 flex-1 text-left text-inherit"
                            >
                                {#if $selectionStore.currentlySelectedNote === note}
                                    {$selectionStore.currentlySelectedNote.name}
                                {:else}
                                    {note.name}
                                {/if}
                            </p>
                        </button>

                        {#if $selectionStore.currentlySelectedNote === note}
                            {#if $selectionStore.currentlySelectedFolder === "Random"}
                                {#if $noteStore.notes.filter((note) => note.folder === "Random").length > 1}
                                    <button
                                        on:click={() => {
                                            $modalStore.deleteNoteModal = true;
                                        }}
                                        class="icon-btn text-red-600"
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                {/if}
                            {:else}
                                <button
                                    on:click={() => {
                                        $modalStore.deleteNoteModal = true;
                                    }}
                                    class="icon-btn text-red-600"
                                    ><svg
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            {/if}
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    {/each}
{:else}
    <Loading />
{/if}
