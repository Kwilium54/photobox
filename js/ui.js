function displayPicture(photo) {
  const section = document.getElementById("la_photo");

  section.innerHTML = "";

  const img = document.createElement("img");
  img.src = `https://webetu.iutnc.univ-lorraine.fr${photo.url.href}`;
  img.alt = photo.titre;

  const title = document.createElement("h2");
  title.textContent = photo.titre;

  const info = document.createElement("p");
  info.textContent = `${photo.type}, ${photo.width} x ${photo.height}`;

  // Ordre : image, titre, infos
  section.appendChild(img);
  section.appendChild(title);
  section.appendChild(info);
}

function displayCategory(categorie) {
  const el = document.getElementById("categorie_nom");
  el.textContent = categorie?.nom || "Non définie";
}

function displayComments(comments) {
  const ul = document.getElementById("les_commentaires");
  ul.innerHTML = "";

  if (!comments.length) {
    ul.innerHTML = "<li>Aucun commentaire</li>";
    return;
  }

  comments.forEach(comment => {
    const li = document.createElement("li");
    li.textContent = `${comment.pseudo} : ${comment.content}`;
    ul.appendChild(li);
  });
}

export default {
  displayPicture,
  displayCategory,
  displayComments
};
