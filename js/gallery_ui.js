import ui from "./ui.js";
import photoloader, { loadResource } from "./photoloader.js";

const photoSection = document.getElementById("photoDetails");
photoSection.style.display = "none";

function displayGallery(galleryData) {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = "";

    if (!galleryData?.photos?.length) {
        galleryContainer.textContent = "Aucune photo à afficher.";
        return;
    }

    const ul = document.createElement("ul");
    ul.className = "gallery-list";

    galleryData.photos.forEach(item => {
        const photo = item.photo;
        const li = document.createElement("li");
        li.className = "gallery-item";
        li.setAttribute("data-photoId", photo.id);

        const img = document.createElement("img");
        img.src = `https://webetu.iutnc.univ-lorraine.fr${photo.thumbnail.href}`;
        img.alt = photo.titre;
        img.title = photo.titre;

        li.appendChild(img);
        ul.appendChild(li);
    });

    // Gestion du clic sur une photo
    ul.addEventListener("click", async (event) => {
        const li = event.target.closest(".gallery-item");
        if (!li) return;

        console.log("Clic sur une miniature détecté");
        const id = li.dataset.photoid;
        console.log("ID de la photo :", id);

        const photo = await photoloader.loadPicture(id);
        if (photo) {
            photoSection.style.display = "block";
            ui.displayPicture(photo);

            if (photo.links?.categorie?.href) {
                const cat = await loadResource(photo.links.categorie.href);
                ui.displayCategory(cat?.categorie || null);
            } else {
                ui.displayCategory(null);
            }

            if (photo.links?.comments?.href) {
                const coms = await loadResource(photo.links.comments.href);
                ui.displayComments(coms?.comments || []);
            } else {
                ui.displayComments([]);
            }
        }
    });

    galleryContainer.appendChild(ul);
}

export default {
    displayGallery
};
