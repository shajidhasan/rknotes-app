<script lang="ts">
    import NoteEditor from "$components/NoteEditor.svelte";
    import Loading from "$components/Loading.svelte";
    import {
        modalStore,
        noteStore,
        selectionStore,
        sideBarShowStore,
        unsavedStore,
    } from "$stores";
    import { saveNote } from "$firebase";
    import { showNotification } from "$utils";
</script>

{#if $noteStore.loaded}
    <div class="p-4 flex flex-row justify-between items-center space-x-4">
        <div href="/" class="flex flex-row">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-primary-600 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                />
                <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                />
            </svg>
            <h1
                class="text-3xl font-semibold underline decoration-primary-500 decoration-4 text-slate-700"
            >
                RKNotes
            </h1>
        </div>
        <div class="flex items-center">
            <button
                on:click={async () => {
                    showNotification("Saving...", "info");
                    $unsavedStore[
                        $selectionStore.currentlySelectedNote.id
                    ] = false;
                    try {
                        await saveNote($selectionStore.currentlySelectedNote);
                        showNotification("Successfully saved!", "success");
                    } catch (err) {
                        console.log(err.message);
                        $unsavedStore[
                            $selectionStore.currentlySelectedNote.id
                        ] = true;
                        showNotification(
                            "Sorry! Something is wrong...",
                            "error"
                        );
                    }
                }}
                class="btn"
            >
                Save
            </button>

            <button
                on:click={() => {
                    $modalStore.shareNoteModal = true;
                }}
                class="icon-btn"
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
            </button>

            <button
                class="icon-btn lg:hidden"
                on:click={() => {
                    $sideBarShowStore = !$sideBarShowStore;
                }}
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
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>
    </div>
    <div class="px-4">
        <input
            type="text"
            class="form-input text-lg font-semibold text-slate-800"
            bind:value={$selectionStore.currentlySelectedNote.name}
            on:keydown={() => {
                $unsavedStore[$selectionStore.currentlySelectedNote.id] = true;
            }}
        />
    </div>
    <div class="p-4 flex-1">
        <NoteEditor />
    </div>
{:else}
    <Loading />
{/if}
