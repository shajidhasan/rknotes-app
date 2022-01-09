<script lang="ts">
    import ModalBase from "./ModalBase.svelte";
    import ModalBody from "./ModalBody.svelte";
    import ModalFooter from "./ModalFooter.svelte";

    import { deleteNote } from "$firebase";
    import { modalStore, noteStore, selectionStore } from "$stores";

    let message: string = "This action is irreversible.";

    const closeModal = () => {
        $modalStore.deleteNoteModal = false;
    };

    const deleteNoteConfirm = async () => {
        const currentNote = $selectionStore.currentlySelectedNote;
        let nextSelection: Note;
        const notes = [...$noteStore.notes].filter((note) => {
            let notMatch: boolean = note !== currentNote;
            if (notMatch) {
                nextSelection = note;
            }
            return notMatch;
        });
        $selectionStore.currentlySelectedFolder = nextSelection.folder;
        $selectionStore.currentlySelectedNote = nextSelection;
        $noteStore.notes = notes;
        closeModal();
        await deleteNote(currentNote.id);
    };
</script>

<ModalBase on:close={closeModal} title="Delete Note">
    <ModalBody>
        <p class="text-lg">Are you sure you want to delete this note?</p>
        <p class="pt-2">
            {message}
        </p>
    </ModalBody>
    <ModalFooter>
        <button class="btn-mute" on:click={closeModal}> Cancel </button>
        <button class="btn bg-red-600 hover:bg-red-500" on:click={deleteNoteConfirm}> Delete </button>
    </ModalFooter>
</ModalBase>
