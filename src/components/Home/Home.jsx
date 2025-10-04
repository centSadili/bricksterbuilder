import React, { useEffect, useState } from "react";
import axios from "axios";
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
        const res = await axios.get(`${apiBaseUrl}/sets/`, {
          params: { page_size: 10, ordering: "-year" },
          headers: { Authorization: `key ${apiKey}` },
        });
        setSets(res.data.results || []);
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
      <section className="flex flex-col lg:flex-row items-center gap-8 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Check out rare finds!
            <br />
            Bring Your <span className="text-red-600">Happiness</span> Home
          </h1>
          <p className="text-lg text-gray-700 max-w-prose">
            Discover unique and limited-edition collectibles. Whether you're a
            builder or a collector, we’ve curated pieces to spark your joy and
            complete your collection.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md">
              Shop Now
            </button>
            <a href="#gallery" className="text-red-600 hover:underline font-medium">
              Browse Gallery
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-start gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="text-2xl">{f.icon}</div>
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-gray-600">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full rounded-lg">
            <img
              src="https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0"
              alt="Colorful build preview"
              className="w-full h-80 object-cover sm:h-96"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-yellow-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Featured gallery</h2>

        {import.meta.env.VITE_REBRICKABLE_API_KEY ? (
          <div className="mb-3 text-sm text-gray-600">Showing latest sets from Rebrickable</div>
        ) : (
          <div className="mb-3 text-sm text-gray-600">API key not provided — showing curated gallery fallback</div>
        )}

        {loadingSets && <div className="mb-3 text-sm">Loading sets...</div>}
        {setsError && <div className="mb-3 text-sm text-red-700">Error: {setsError}</div>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {(
            // Use fetched sets when available, otherwise fallback to static images
            sets.length ? sets : galleryImages.map((url) => ({ set_img_url: url, name: "Fallback" }))
          ).map((item, index) => {
            const imgSrc = item.set_img_url || item.img_url || item.image_url || item.image || "";
            const title = item.name || item.set_num || `Item ${index + 1}`;
            return (
              <div key={index} className="rounded-md overflow-hidden bg-white relative pb-[75%]">
                <img
                  src={imgSrc}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Secondary Promo */}
      <section className="flex flex-col lg:flex-row items-center gap-8 mb-16 mt-16">
        <div className="flex-1">
          <div className="w-full rounded-lg">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.317kupd1guYqy0hQRKSkxQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Community showcase"
              className="w-full h-80 object-cover sm:h-96"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold leading-tight">
            Join the community
          </h2>
          <p className="text-lg text-gray-700">
            Connect with fellow builders and collectors. Share builds, trade
            pieces, and find inspiration for your next project.
          </p>
          <div className="flex gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md">
              Get Started
            </button>
            <button className="border border-red-600 text-red-600 font-medium py-2 px-5 rounded-md hover:bg-red-50">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </PageView>
  );
};

export default Home;
