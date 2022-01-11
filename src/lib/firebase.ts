import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, deleteDoc, getDocs, updateDoc, query, where, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { authStore, noteStore, selectionStore, unsavedStore, userNameStore } from "$stores";

const firebaseConfig = {
    apiKey: "AIzaSyD5kvfwbKM2wZpDQs-JDV6fBze0TEiri6E",
    authDomain: "rknotes-3377a.firebaseapp.com",
    projectId: "rknotes-3377a",
    storageBucket: "rknotes-3377a.appspot.com",
    messagingSenderId: "542948330004",
    appId: "1:542948330004:web:9e49fe9c904a495bf17501"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserName();
        authStore.set({
            isLoggedIn: true,
            user,
            updated: true
        });
    } else {
        authStore.set({
            isLoggedIn: false,
            user,
            updated: true
        });
    }
});

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => signOut(auth);

export const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loadUserName = async () => {
    const uid = auth.currentUser.uid;
    const docSnapshot = await getDoc(doc(firestore, 'users', uid));
    userNameStore.set(docSnapshot.data().name);
}

export const addNewUserData = async (uid: string, name: string, email: string) => {
    await setDoc(doc(firestore, 'users', uid), { name, email });
    const firstNote: Note = {
        name: 'Your very first note',
        id: 'first-note',
        folder: 'Random',
        data: '# Hello, world!',
        public: false,
        publicId: '',
        creator: name
    }
    await setDoc(doc(firestore, 'users', uid, 'notes', firstNote.id), firstNote);
};

export const loadCurrentUserNotes = async () => {
    const uid = auth.currentUser.uid;
    try {
        let notes: Note[];
        let unsavedData: { [key: string]: boolean } = {};
        const querySnapshot = await getDocs(collection(firestore, 'users', uid, 'notes'));
        if (querySnapshot.empty) return;
        notes = querySnapshot.docs.map((documentData) => {
            const data: Note = documentData.data() as Note;
            unsavedData[data.id] = false;
            return data;
        });

        unsavedStore.set(unsavedData);
        noteStore.set({
            loaded: true,
            error: false,
            notes,
        });
        selectionStore.set({
            currentlySelectedFolder: notes[0].folder,
            currentlySelectedNote: notes[0]
        });

    } catch (error) {
        noteStore.set({
            loaded: true,
            error: true,
            notes: [],
        });
    }
}

export const addNewNote = (note: Note) => {
    const uid = auth.currentUser.uid;
    console.log(note);
    return setDoc(doc(firestore, 'users', uid, 'notes', note.id), note as { [x: string]: any; });
}

export const saveNote = (note: Note) => {
    const uid = auth.currentUser.uid;
    return updateDoc(doc(firestore, 'users', uid, 'notes', note.id), note as { [x: string]: any; });
}

export const deleteFolder = (ids: string[]) => {
    ids.forEach((id) => {
        deleteNote(id);
    })
}

export const renameFolder = (ids: string[], newFolderName: string) => {
    const uid = auth.currentUser.uid;
    ids.forEach((id) => {
        updateDoc(doc(firestore, 'users', uid, 'notes', id), { folder: newFolderName });
    });
}

export const deleteNote = async (id: string) => {
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(firestore, 'users', uid, 'notes', id));
}

export const shareNote = async (id: string, share: boolean, shareId: string) => {
    const uid = auth.currentUser.uid;
    if (!share) {
        await updateDoc(doc(firestore, 'users', uid, 'notes', id), { public: share, publicId: shareId });
        return;
    } else {
        const querySnapshot = await getDocs(query(collection(firestore, 'users', uid, 'notes'), where('publicId', '==', shareId)));
        if (querySnapshot.empty) {
            await updateDoc(doc(firestore, 'users', uid, 'notes', id), { public: share, publicId: shareId });
        } else {
            throw new Error("This link already exists");
        }
    }
}

const storage = getStorage(app);

export const uploadImage = async (image: File) => {
    const name = `${new Date().getTime().toString()}.${image.name.split('.').at(-1)}`;
    const imageRef = ref(storage, `note-images/${name}`);
    return uploadBytes(imageRef, image, { contentType: image.type });
}

