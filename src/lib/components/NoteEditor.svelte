<script lang="ts">
    import { onMount } from "svelte";
    // import EasyMDE from "easymde";
    // import "easymde/dist/easymde.min.css";
    import { selectionStore, unsavedStore } from "$stores";
    // import { uploadImage } from "$firebase";
    // import { getDownloadURL } from "firebase/storage";
    // import { showNotification } from "$utils";

    import Editor from "@toast-ui/editor";
    import "@toast-ui/editor/dist/toastui-editor.css";

    // let textArea: HTMLTextAreaElement;
    let editorDiv: HTMLElement;
    // let easyMDE: EasyMDE;
    let editor: Editor;

    let currentId = "";

    selectionStore.subscribe((data) => {
        if (!editor) return;
        if (data.currentlySelectedNote.id !== currentId) {
            currentId = data.currentlySelectedNote.id;
            const unsaved = $unsavedStore[currentId];
            editor.setMarkdown(data.currentlySelectedNote.data);
            $unsavedStore[currentId] = unsaved;
        }
    });

    onMount(() => {
        editor = new Editor({
            el: editorDiv,
            height: "100%",
            initialEditType: "markdown",
            usageStatistics: false,
            toolbarItems: [
                ["heading", "bold", "italic"],
                ["hr", "quote"],
                ["ul", "ol"],
                ["table", "image", "link"],
                ["code", "codeblock"],
            ],
        });

        editor.getMarkdown();
        // easyMDE = new EasyMDE({
        //     element: textArea,
        //     spellChecker: false,
        //     maxHeight: "calc(100vh - 350px)",
        //     uploadImage: true,
        //     imageMaxSize: 1024 * 1024,
        //     imageAccept: "image/png, image/jpeg, image/gif",
        //     imageUploadFunction: async (image, onSuccess, onError) => {
        //         try {
        //             showNotification("Uploading image...", "info");
        //             const uploadResult = await uploadImage(image);
        //             const imageUrl = await getDownloadURL(uploadResult.ref);
        //             onSuccess(imageUrl);
        //         } catch (error) {
        //             onError(error.toString());
        //             console.log(error.toString());
        //             showNotification("Error! Check logs.", "error");
        //         }
        //     },
        //     imagePathAbsolute: true,
        // });
        currentId = $selectionStore.currentlySelectedNote.id;
        editor.setMarkdown($selectionStore.currentlySelectedNote.data);
        editor.on("change", (event) => {
            $selectionStore.currentlySelectedNote.data = editor.getMarkdown();
            $unsavedStore[$selectionStore.currentlySelectedNote.id] = true;
        });

        // easyMDE.value($selectionStore.currentlySelectedNote.data);
        // easyMDE.codemirror.on("change", (event, changeObj) => {
        //     if (
        //         $selectionStore.currentlySelectedNote.data !== changeObj.text[0]
        //     ) {
        //         $unsavedStore[$selectionStore.currentlySelectedNote.id] = true;
        //     }
        //     $selectionStore.currentlySelectedNote.data = easyMDE.value();
        // });
        // let isMobile = window.matchMedia(
        //     "only screen and (max-width: 760px)"
        // ).matches;
        // if (isMobile) {
        //     easyMDE.toTextArea();
        // }
    });
</script>

<!-- <textarea name="note-editor" bind:this={textArea} /> -->
<div bind:this={editorDiv} class="bg-white rounded" />
