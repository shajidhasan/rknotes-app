<script lang="ts">
    import ModalBase from "./ModalBase.svelte";
    import ModalBody from "./ModalBody.svelte";
    import ModalFooter from "./ModalFooter.svelte";

    import { addNewNote } from "$firebase";
    import { modalStore, noteStore, userNameStore } from "$stores";
    import { getNewNote } from "$utils";

    let newFolderName: string = "New Folder";
    let message: string = "Make sure it's unique.";

    const closeModal = () => {
        $modalStore.newFolderModal = false;
    };

    const createFolder = async () => {
        if (newFolderName === "") {
            message = "Folder name cannot be empty!";
            return;
        }
        let folderNameExists: boolean = false;
        for (const note of $noteStore.notes) {
            if (note.folder === newFolderName) {
                folderNameExists = true;
                break;
            }
        }
        if (folderNameExists) {
            message = "Folder is not unique!";
            return;
        }

        const newNote: Note = getNewNote(newFolderName, $userNameStore);

        $noteStore.notes = [...$noteStore.notes, newNote];
        closeModal();
        await addNewNote(newNote);
    };
</script>

<ModalBase on:close={closeModal} title="Create New Folder">
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
        <button class="btn" on:click={createFolder}> Create </button>
    </ModalFooter>
</ModalBase>
