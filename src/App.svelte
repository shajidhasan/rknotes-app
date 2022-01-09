<script lang="ts">
    import Router from "svelte-spa-router";
    import routes from "./lib/routes";
    import { modalStore, notificationStore } from "$stores";
    
    import Notification from "$components/Notification.svelte";
    import NewFolderModal from "$components/modals/NewFolderModal.svelte";
    import ShareNoteModal from "$components/modals/ShareNoteModal.svelte";
    import DeleteFolderModal from "$components/modals/DeleteFolderModal.svelte";
    import DeleteNoteModal from "$components/modals/DeleteNoteModal.svelte";
    import RenameFolderModal from "$components/modals/RenameFolderModal.svelte";
</script>

<Router {routes} />

{#if $notificationStore.show}
    <Notification
        notificationMessage={$notificationStore.message}
        notificationType={$notificationStore.type}
        on:close={() => {
            $notificationStore.show = false;
        }}
    />
{/if}

{#if $modalStore.newFolderModal}
    <NewFolderModal />
{/if}

{#if $modalStore.shareNoteModal}
    <ShareNoteModal />
{/if}

{#if $modalStore.deleteFolderModal}
    <DeleteFolderModal />
{/if}

{#if $modalStore.deleteNoteModal}
    <DeleteNoteModal />
{/if}

{#if $modalStore.renameFolderModal}
    <RenameFolderModal />
{/if}
