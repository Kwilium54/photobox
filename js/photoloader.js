import { API_BASE_URL } from "./config.js";

const photoloader = {
  async loadPicture(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Erreur ${response.status} : ${response.statusText}`);
      }
      const data = await response.json();
      return { ...data.photo, links: data.links };
    } catch (error) {
      console.error("Erreur dans loadPicture :", error);
      return null;
    }
  },

};

async function loadResource(uri) {
  const url = `https://webetu.iutnc.univ-lorraine.fr${uri}`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Erreur ${response.status} : ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement de la ressource :", error);
    return null;
  }
}

export { loadResource };
export default photoloader;
