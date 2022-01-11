<script lang="ts">
    import copy from "copy-to-clipboard";

    import ModalBase from "./ModalBase.svelte";
    import ModalBody from "./ModalBody.svelte";
    import ModalFooter from "./ModalFooter.svelte";

    import { shareNote } from "$firebase";
    import { getRandomID, showNotification } from "$utils";
    import { modalStore, selectionStore } from "$stores";

    let id = $selectionStore.currentlySelectedNote.id;
    let share = $selectionStore.currentlySelectedNote.public;
    let publicId = $selectionStore.currentlySelectedNote.publicId;

    let message: string =
        "People will be able to see your note by clicking this link.";

    const closeModal = () => {
        $modalStore.shareNoteModal = false;
    };

    const shareNoteUpdate = async () => {
        if (publicId.length < 3 && share) {
            message = "Link must be at least 3 characters long!";
            return;
        }

        if (
            $selectionStore.currentlySelectedNote.public === share &&
            $selectionStore.currentlySelectedNote.publicId === publicId
        ) {
            closeModal();
            return;
        }

        try {
            message = "Please wait...";
            await shareNote(id, share, publicId);
            $selectionStore.currentlySelectedNote.id = id;
            $selectionStore.currentlySelectedNote.public = share;
            $selectionStore.currentlySelectedNote.publicId = publicId;
            closeModal();
            if (share) {
                copy("https://rknotes.xyz/s/" + publicId);
                showNotification("Updated and copied link!", "success");
            }
        } catch (err) {
            message = err.message;
        }
    };
</script>

<ModalBase on:close={closeModal} title="Share This Note">
    <ModalBody>
        <div class="flex flex-row items-center space-x-2">
            <input
                type="checkbox"
                class="text-primary-600 focus:border-primary-600 focus:ring-primary-600"
                bind:checked={share}
                id="share"
            />
            <label for="share" class="text-lg">Sharing enabled</label>
        </div>
        <div class="flex flex-row items-center space-x-2">
            <label for="share-id">Link: </label>
            <span class="text-primary-600" class:text-gray-400={!share}
                >https://rknotes.xyz/s/</span
            >
            <input
                type="text"
                id="share-id"
                bind:value={publicId}
                class="form-input font-semibold text-primary-600 disabled:text-gray-400"
                disabled={!share}
            />
            <button
                class="icon-btn disabled:text-gray-400 hover:bg-slate-100"
                disabled={!share}
                on:click={() => {
                    publicId = getRandomID(4);
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
            </button>
        </div>
        <p class="pt-2">
            {message}
        </p>
    </ModalBody>
    <ModalFooter>
        <button class="btn-mute" on:click={closeModal}>Cancel</button>
        <button class="btn" on:click={shareNoteUpdate}>Update</button>
    </ModalFooter>
</ModalBase>
