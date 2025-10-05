import axios from "axios";

/**
 * Fetch sets from Rebrickable API. Returns an array of set objects (may be empty).
 * If apiKey is falsy, resolves to an empty array (caller can use fallbacks).
 */
export async function fetchRebrickableSets(apiKey, apiBaseUrl = "https://rebrickable.com/api/v3/lego", pageSize = 10) {
  if (!apiKey) return [];
  const res = await axios.get(`${apiBaseUrl}/sets/`, {
    params: { page_size: pageSize, ordering: "-year" },
    headers: { Authorization: `key ${apiKey}` },
  });
  return res.data.results || [];
}

/**
 * Normalize a source array (either fetched sets or fallback image objects) and
 * return only items that have a usable image URL. Each returned item has:
 * { imgSrc, title, original: <original item> }
 */
export function normalizeAndFilterGalleryItems(source, fallbackImages = []) {
  const effectiveSource = source && source.length ? source : fallbackImages.map((url) => ({ set_img_url: url, name: "Fallback" }));

  return effectiveSource
    .map((item) => ({
      original: item,
      imgSrc: item.set_img_url || item.img_url || item.image_url || item.image || "",
      title: item.name || item.set_num || "Gallery item",
    }))
    .filter((it) => it.imgSrc && it.imgSrc.trim() !== "");
}

export default {
  fetchRebrickableSets,
  normalizeAndFilterGalleryItems,
};
