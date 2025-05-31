import { loadResource } from "./photoloader.js";

const gallery = {
  data: null,        
  currentPage: 1,

  async load(page = 1, size = 9) {
    // Charge la page demandée
    const uri = `/www/canals5/phox/api/photos/?page=${page}&size=${size}`;
    const data = await loadResource(uri);
    if (data) {
      this.data = data;
      this.currentPage = page;
    }
    return data;
  },

  async next() {
    if (this.data?.links?.next?.href) {
      const data = await loadResource(this.data.links.next.href);
      if (data) {
        this.data = data;
        this.currentPage = this.getPageNumberFromHref(data.links.next.href) - 1;
      }
      return data;
    }
    return null;
  },

  async prev() {
    if (this.data?.links?.prev?.href) {
      const data = await loadResource(this.data.links.prev.href);
      if (data) {
        this.data = data;
        this.currentPage = this.getPageNumberFromHref(data.links.prev.href) + 1;
      }
      return data;
    }
    return null;
  },

  //ajout personnel pour aller à la première ou dernière page
  async first() {
    if (this.data?.links?.first?.href) {
      const data = await loadResource(this.data.links.first.href);
      if (data) {
        this.data = data;
        this.currentPage = 1;
      }
      return data;
    }
    return null;
  },

  //ajout personnel pour aller à la dernière page
  async last() {
    if (this.data?.links?.last?.href) {
      const data = await loadResource(this.data.links.last.href);
      if (data) {
        this.data = data;
        // Extraire numéro dernière page depuis last.href
        this.currentPage = this.getPageNumberFromHref(data.links.last.href);
      }
      return data;
    }
    return null;
  },

  getPageNumberFromHref(href) {
    // Parse la query string pour extraire page=X
    const url = new URL("https://webetu.iutnc.univ-lorraine.fr" + href);
    return Number(url.searchParams.get("page")) || 1;
  }
};

export default gallery;
