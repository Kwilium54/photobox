import gallery from "./gallery.js";
import galleryUI from "./gallery_ui.js";

const btnLoad = document.getElementById("loadGalleryButton");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFirst = document.getElementById("btnFirst");
const btnLast = document.getElementById("btnLast");

function updateNavigationButtons() {
    btnPrev.disabled = !gallery.data?.links?.prev;
    btnNext.disabled = !gallery.data?.links?.next;
    btnFirst.disabled = !gallery.data?.links?.first;
    btnLast.disabled = !gallery.data?.links?.last;
}

async function loadAndDisplayPage(page = 1) {
    const data = await gallery.load(page);
    galleryUI.displayGallery(data);
    updateNavigationButtons();
}

async function goNext() {
    const data = await gallery.next();
    if (data) {
        galleryUI.displayGallery(data);
        updateNavigationButtons();
    }
}

async function goPrev() {
    const data = await gallery.prev();
    if (data) {
        galleryUI.displayGallery(data);
        updateNavigationButtons();
    }
}

async function goFirst() {
    const data = await gallery.first();
    if (data) {
        galleryUI.displayGallery(data);
        updateNavigationButtons();
    }
}

async function goLast() {
    const data = await gallery.last();
    if (data) {
        galleryUI.displayGallery(data);
        updateNavigationButtons();
    }
}

// Branchements
btnLoad.addEventListener("click", () => loadAndDisplayPage(1));
btnPrev.addEventListener("click", goPrev);
btnNext.addEventListener("click", goNext);
btnFirst.addEventListener("click", goFirst);
btnLast.addEventListener("click", goLast);
