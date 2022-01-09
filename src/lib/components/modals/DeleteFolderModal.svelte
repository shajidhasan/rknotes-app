<script lang="ts">
    import ModalBase from "./ModalBase.svelte";
    import ModalBody from "./ModalBody.svelte";
    import ModalFooter from "./ModalFooter.svelte";

    import { deleteFolder } from "$firebase";
    import { modalStore, noteStore, selectionStore } from "$stores";

    let message: string =
        "This action is irreversible. All of notes under this folder will be gone.";

    const closeModal = () => {
        $modalStore.deleteFolderModal = false;
    };

    const deleteFolderConfirm = async () => {
        const folder = $selectionStore.currentlySelectedFolder;
        const ids: string[] = [];
        let nextSelection: Note;
        const notes = [...$noteStore.notes].filter((note) => {
            let notMatch: boolean = note.folder !== folder;
            if (notMatch) {
                nextSelection = note;
            } else {
                ids.push(note.id);
            }
            return notMatch;
        });
        $selectionStore.currentlySelectedFolder = nextSelection.folder;
        $selectionStore.currentlySelectedNote = nextSelection;
        $noteStore.notes = notes;
        closeModal();
        deleteFolder(ids);
    };
</script>

<ModalBase on:close={closeModal} title="Delete Folder">
    <ModalBody>
        <p class="text-lg">Are you sure you want to delete this folder?</p>
        <p class="pt-2">
            {message}
        </p>
    </ModalBody>
    <ModalFooter>
        <button class="btn-mute" on:click={closeModal}> Cancel </button>
        <button
            class="btn bg-red-600 hover:bg-red-500"
            on:click={deleteFolderConfirm}
        >
            Delete
        </button>
    </ModalFooter>
</ModalBase>
