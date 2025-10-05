import React, { useEffect, useState } from "react";
import * as galleryService from "../../services/galleryService";
import PageView from "../Common/PageView/PageView";

const Discover = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;
    const apiBaseUrl = import.meta.env.VITE_REBRICKABLE_API_BASE_URL || "https://rebrickable.com/api/v3/lego";
    if (!apiKey) return; // don't fetch when key not provided

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await galleryService.fetchRebrickableSets(apiKey, apiBaseUrl, 50);
        setSets(results || []);
      } catch (err) {
        setError(err?.message || "Failed to fetch sets");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Normalize with gallery service (fallback to empty array for local preview)
  const items = galleryService.normalizeAndFilterGalleryItems(sets, []);

  const filtered = items.filter((it) => {
    if (!query) return true;
    return it.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <PageView title="Home" showFooter={true} className="">

      {loading && <div className="text-sm text-gray-600 mb-4">Loading...</div>}
      {error && <div className="text-sm text-red-600 mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((it, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex gap-4">
            <div className="w-32 flex-shrink-0 flex items-center justify-center">
              <img src={it.imgSrc} alt={it.title} className="max-w-full max-h-28 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{it.original?.theme_name || it.original?.set_num || "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </PageView>
  );
};

export default Discover;
