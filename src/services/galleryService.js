import axios from "axios";
const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;
const baseUrl = import.meta.env.VITE_REBRICKABLE_API_BASE_URL;

const normalizeGalleryItems = (items, failedImages = new Set()) => {
  if (!items || items.length === 0) return [];

  return items
    .map((item) => {
      // For API data - sets
      if (item.set_img_url) {
        return {
          title: item.name || "LEGO Set",
          imgSrc: item.set_img_url,
          setNum: item.set_num,
        };
      }
      // For API data - minifigs
      else if (item.set_img_url || item.name) {
        return {
          title: item.name || "LEGO Minifig",
          imgSrc: item.set_img_url || item.img_url,
          setNum: item.set_num,
        };
      }
      // For API data - parts
      else if (item.part) {
        return {
          title: item.part.name || "LEGO Part",
          imgSrc: item.part.part_img_url,
          setNum: item.part.part_num,
        };
      }
      // For fallback data
      else {
        return {
          title: item.title,
          imgSrc: item.imgSrc,
        };
      }
    })
    .filter((item) => {
      // Filter out items without valid images or that have failed to load
      return (
        item.imgSrc &&
        item.imgSrc.trim() !== "" &&
        !item.imgSrc.includes("placeholder") &&
        !item.imgSrc.includes("via.placeholder") &&
        item.imgSrc !== "null" &&
        item.imgSrc !== "undefined" &&
        !failedImages.has(item.imgSrc) // Exclude failed images
      );
    });
};
const getLegoLists = (listType,page) => {
  return axios
    .get(`${baseUrl}/lego/${listType}/`,
      { params: { key: apiKey, page: page } }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching LEGO ${listType}:`, err);
      throw err;
    }
    );
}

const getLegoset = (setNum) => {
  return axios
    .get(`${baseUrl}/lego/sets/${setNum}`,
      { params: { key: apiKey } }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching LEGO set:", err);
      throw err;
    });
}

const getMinifig = (setNum) => {
  return axios
    .get(`${baseUrl}/lego/minifigs/${setNum}`,
      { params: { key: apiKey } }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching LEGO minifigure:", err);
      throw err;
    });
}

const getParts = (setNum) => {
  return axios
    .get(`${baseUrl}/lego/sets/${setNum}/parts/`,
      { params: { key: apiKey } }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching LEGO set parts:", err);
      throw err;
    });
}

export {
  getLegoLists,
  getLegoset,
  getMinifig,
  getParts,
  normalizeGalleryItems
}
