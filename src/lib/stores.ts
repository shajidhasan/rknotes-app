import { writable } from "svelte/store";
import type { User } from "firebase/auth";
import { location, replace } from "svelte-spa-router";
import { loadCurrentUserNotes } from "$firebase";

export const userNameStore = writable<string>();

export const authStore = writable<{
    isLoggedIn: boolean;
    user?: User;
    updated: boolean;
}>({
    isLoggedIn: false,
    updated: false
});

authStore.subscribe((data) => {
    if (data.updated && !data.isLoggedIn) {
        location.subscribe((loc) => {
            if (loc !== "/login" && loc !== "/register")
                replace("/login");
        })
    } else if (data.updated && data.isLoggedIn) {
        loadCurrentUserNotes()
    }
});

export const noteStore = writable<{
    loaded: boolean;
    error: boolean;
    notes: Note[];
}>({
    loaded: false,
    error: false,
    notes: [],
});

export const selectionStore = writable<{
    currentlySelectedFolder: string;
    currentlySelectedNote: Note;
}>({
    currentlySelectedFolder: '',
    currentlySelectedNote: null
});

export const unsavedStore = writable<{ [key: string]: boolean }>({});

export const modalStore = writable<{
    newFolderModal: boolean;
    renameFolderModal: boolean;
    deleteFolderModal: boolean;
    deleteNoteModal: boolean;
    shareNoteModal: boolean;
}>({
    newFolderModal: false,
    renameFolderModal: false,
    deleteFolderModal: false,
    deleteNoteModal: false,
    shareNoteModal: false,
});

export const notificationStore = writable<{
    show: boolean;
    message: string;
    type: 'error' | 'info' | 'success';
}>({
    show: false,
    message: '',
    type: "info"
});

export const sideBarShowStore = writable<boolean>(false);
