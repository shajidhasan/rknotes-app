<script lang="ts">
    import ModalBase from "./ModalBase.svelte";
    import ModalBody from "./ModalBody.svelte";
    import ModalFooter from "./ModalFooter.svelte";

    import { renameFolder } from "$firebase";
    import { modalStore, noteStore, selectionStore } from "$stores";

    let newFolderName: string = $selectionStore.currentlySelectedFolder;
    let message: string = "Make sure it's unique.";

    const closeModal = () => {
        $modalStore.renameFolderModal = false;
    };

    const renameFolderConfirm = async () => {
        const folder = $selectionStore.currentlySelectedFolder;
        const ids: string[] = [];

        if (newFolderName === "") {
            message = "Folder name cannot be empty!";
            return;
        }

        $noteStore.notes = $noteStore.notes.map((note) => {
            if (note.folder === folder) {
                note.folder = newFolderName;
                ids.push(note.id);
                return note;
            }
            return note;
        });
        closeModal();
        renameFolder(ids, newFolderName);
    };
</script>


<ModalBase on:close={closeModal} title="Rename Folder">
    <ModalBody>
        <div class="flex flex-row items-center">
            <label class="flex-shrink-0 text-slate-700" for="deckNameInput"
                >Name</label
            >
            <input
                type="text"
                id="deckNameInput"
                class="ml-2 form-input flex-1"
                bind:value={newFolderName}
            />
        </div>
        <p class="pt-2">
            {message}
        </p>
    </ModalBody>
    <ModalFooter>
        <button class="btn-mute" on:click={closeModal}>Cancel</button>
        <button class="btn" on:click={renameFolderConfirm}> Create </button>
    </ModalFooter>
</ModalBase>
