import axios from "axios";
const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;
const baseUrl = import.meta.env.VITE_REBRICKABLE_API_BASE_URL;

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
  getParts
}
