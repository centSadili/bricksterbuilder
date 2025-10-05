import React, { useEffect, useState } from "react";
import axios from "axios";
import * as galleryService from "../../services/galleryService";
import PageView from "../Common/PageView/PageView";

const Home = () => {
  const galleryImages = [
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
  ];

  const features = [
    { title: "Limited Editions", desc: "Rare builds & exclusive drops", icon: "🧩" },
    { title: "Verified Sellers", desc: "Trusted community vendors", icon: "✅" },
    { title: "Fast Shipping", desc: "Get your sets quickly", icon: "🚚" },
  ];

  // State for Rebrickable sets
  const [sets, setSets] = useState([]);
  const [loadingSets, setLoadingSets] = useState(false);
  const [setsError, setSetsError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;
    const apiBaseUrl = import.meta.env.VITE_REBRICKABLE_API_BASE_URL || "https://rebrickable.com/api/v3/lego";
    if (!apiKey) return; // don't fetch when key not provided

    const fetchSets = async () => {
      setLoadingSets(true);
      setSetsError(null);
      try {
        const results = await galleryService.fetchRebrickableSets(apiKey, apiBaseUrl, 10);
        setSets(results || []);
      } catch (err) {
        setSetsError(err?.message || "Failed to fetch sets");
      } finally {
        setLoadingSets(false);
      }
    };

    fetchSets();
  }, []);

  return (
    <PageView title="Home" showFooter={true} className="">
      {/* Hero Section */}
      <section className="relative mb-8 pt-8">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Check out rare finds!
              <br />
              Bring Your <span className="text-red-600">Happiness</span> Home
            </h1>
            <p className="text-lg text-gray-700 max-w-prose mt-4">
              Discover unique and limited-edition collectibles. Whether you're a
              builder or a collector, we’ve curated pieces to spark your joy and
              complete your collection.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-md shadow-md">
                Shop Now
              </button>
              <a href="#gallery" className="text-black hover:underline font-medium">
                Browse Gallery
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full">
              <img
                src="https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0"
                alt="Colorful build preview"
                className="w-full h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section (full-width yellow band with horizontal scroll) */}
      <section id="gallery" className="w-full bg-yellow-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold">Featured gallery</h2>
              {import.meta.env.VITE_REBRICKABLE_API_KEY ? (
                <div className="text-sm text-gray-700">Showing latest sets from Rebrickable</div>
              ) : (
                <div className="text-sm text-gray-700">API key not provided — showing curated gallery fallback</div>
              )}
            </div>
            <div className="hidden sm:flex gap-2">
              {/* Category tabs (non-functional sample) */}
              <button className="text-sm px-3 py-1 rounded-full bg-white/80 hover:bg-white">Marvel</button>
              <button className="text-sm px-3 py-1 rounded-full bg-white/80 hover:bg-white">DC</button>
              <button className="text-sm px-3 py-1 rounded-full bg-white/80 hover:bg-white">Others</button>
            </div>
          </div>

          {loadingSets && <div className="mb-3 text-sm text-gray-700">Loading sets...</div>}
          {setsError && <div className="mb-3 text-sm text-red-700">Error: {setsError}</div>}

          {(() => {
            const itemsWithImages = galleryService.normalizeAndFilterGalleryItems(sets, galleryImages);

            if (!itemsWithImages.length) {
              return <div className="text-sm text-gray-700">No images available to display.</div>;
            }

            return (
              <div className="-mx-4 px-4">
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-4">
                  {itemsWithImages.map((item, index) => (
                    <div key={index} className="flex-none w-52 bg-white rounded-md shadow-sm p-2">
                      <div className="w-full h-40 rounded-md overflow-hidden flex items-center justify-center bg-white">
                        <img
                          src={item.imgSrc}
                          alt={item.title}
                          title={item.title}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Why Choose Us / Secondary Promo */}
      <section className="container mx-auto px-4 my-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.317kupd1guYqy0hQRKSkxQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Community showcase"
              className="w-full rounded-lg shadow-lg object-contain"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-lg text-gray-700">
              Check out rare finds! Bring Your <span className="text-red-600">Happiness</span> Home!
            </p>
            <p className="text-gray-600">
              Connect with fellow builders and collectors. Share builds, trade
              pieces, and find inspiration for your next project.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-md">Shop Now</button>
              <button className="border border-black text-black font-medium py-2 px-6 rounded-md hover:bg-black/5">Shop Now</button>
            </div>
          </div>
        </div>
      </section>
    </PageView>
  );
};

export default Home;
