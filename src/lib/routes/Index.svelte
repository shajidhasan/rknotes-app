<script lang="ts">
    import TreeView from "$components/TreeView.svelte";
    import NoteView from "$components/NoteView.svelte";
    import { logout, addNewNote } from "$firebase";
    import {
        modalStore,
        noteStore,
        selectionStore,
        sideBarShowStore,
        userNameStore,
    } from "$stores";
    import { getNewNote } from "$utils";
</script>

<div class="relative h-screen lg:flex">
    <!-- Add a backdrop when the sidebar is open in mobile devices -->
    {#if $sideBarShowStore}
        <div
            class="absolute inset-0 bg-slate-900/60 z-20"
            on:click={() => {
                $sideBarShowStore = !$sideBarShowStore;
            }}
        />
    {/if}
    <div
        class:-translate-x-full={!$sideBarShowStore}
        class="flex-shrink-0 w-80 bg-white shadow-md absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20"
    >
        <div class="flex flex-col h-full">
            <div class="p-4 flex flex-row justify-end space-x-2">
                <button
                    on:click={() => {
                        $modalStore.newFolderModal = true;
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
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                </button>
                <button
                    on:click={async () => {
                        const newNote = getNewNote(
                            $selectionStore.currentlySelectedFolder,
                            $userNameStore
                        );

                        $noteStore.notes = [...$noteStore.notes, newNote];
                        $selectionStore.currentlySelectedNote = newNote;
                        await addNewNote(newNote);
                    }}
                    class="icon-btn-fill"
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
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg></button
                >
            </div>
            <hr />
            <div class="flex-1 py-4">
                <TreeView />
            </div>
            <div class="bg-gray-50 p-3">
                <button on:click={logout} class="btn-nofill text-slate-700">
                    Log out
                </button>
            </div>
        </div>
    </div>
    <div class="flex-1 flex flex-col h-screen bg-slate-50">
        <NoteView />
    </div>
</div>
