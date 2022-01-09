import { notificationStore } from "$stores";

export const getNewNote = (folder: string, creator: string): Note => {
    const newNoteId: string = new Date().getTime().toString();
    const newNote: Note = {
        id: newNoteId,
        folder,
        name: "New note",
        data: "# My awesome note",
        public: false,
        publicId: '',
        creator,
    };
    return newNote;
}

export const getRandomID = (length: number) => {
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const showNotification = (message: string, type: 'error' | 'info' | 'success' = 'info') => {
    notificationStore.set({
        message,
        type,
        show: true
    });

    setTimeout(() => {
        notificationStore.set({
            message: '',
            type: 'info',
            show: false
        })
    }, 4000);
}
