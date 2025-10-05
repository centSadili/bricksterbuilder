import React, { useEffect, useState } from 'react'
import * as galleryService from "../../services/galleryService";
import PageView from '../Common/PageView/PageView';

const Trending = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;
    const apiBaseUrl = import.meta.env.VITE_REBRICKABLE_API_BASE_URL || "https://rebrickable.com/api/v3/lego";
    if (!apiKey) return;

    const fetchSets = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await galleryService.fetchRebrickableSets(apiKey, apiBaseUrl, 20);
        setSets(results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  const items = galleryService.normalizeAndFilterGalleryItems(sets, []);

  return (
    <PageView title="Trending" showFooter={true} className="">
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Trending</h1>
      {loading && <p className="text-gray-600">Loading trending sets...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">
              {item.original?.year && `Year: ${item.original.year}`}
              {item.original?.num_parts && ` • ${item.original.num_parts} parts`}
            </p>
          </div>
        ))}
      </div>
      
      {!loading && items.length === 0 && (
        <p className="text-gray-600">No trending sets available.</p>
      )}
    </div>
    </PageView>
  );
}

export default Trending
