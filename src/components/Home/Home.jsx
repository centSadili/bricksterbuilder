import React, { useEffect, useState } from "react";
import axios from "axios";
import PageView from "../Common/PageView/PageView";
import * as galleryService from "../../services/galleryService";

const Home = () => {
  const [sets, setSets] = useState([]);
  const [loadingSets, setLoadingSets] = useState(false);
  const [setsError, setSetsError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("sets"); // New state for active category
  const [currentSlide, setCurrentSlide] = useState(0); // Carousel state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Auto-play state

  // Sample set numbers to display in the gallery
  const featuredSetNumbers = [
    "76391-1", // Hogwarts Icons
    "10300-1", // Back to the Future Time Machine
    "76405-1", // Hogwarts Express
    "21348-1", // Dungeons & Dragons
    "10497-1", // Galaxy Explorer
    "76393-1", // Harry Potter & Hermione Granger
  ];

  // Sample minifig numbers
  const featuredMinifigNumbers = [
    "fig-000001", // Generic minifig
    "fig-000002", // Generic minifig
    "fig-000003", // Generic minifig
    "fig-000004", // Generic minifig
    "fig-000005", // Generic minifig
    "fig-000006", // Generic minifig
  ];

  // Fallback gallery images for when API is not available
  const galleryImages = {
    sets: [
      {
        title: "LEGO Hogwarts Icons",
        imgSrc: "https://images.brickset.com/sets/large/76391-1.jpg",
      },
      {
        title: "Back to the Future Time Machine",
        imgSrc: "https://images.brickset.com/sets/large/10300-1.jpg",
      },
      {
        title: "Hogwarts Express",
        imgSrc: "https://images.brickset.com/sets/large/76405-1.jpg",
      },
      {
        title: "Dungeons & Dragons",
        imgSrc: "https://images.brickset.com/sets/large/21348-1.jpg",
      },
      {
        title: "Galaxy Explorer",
        imgSrc: "https://images.brickset.com/sets/large/10497-1.jpg",
      },
    ],
    minifigs: [
      {
        title: "Harry Potter",
        imgSrc: "https://img.bricklink.com/ItemImage/MN/0/hp001.png",
      },
      {
        title: "Hermione Granger",
        imgSrc: "https://img.bricklink.com/ItemImage/MN/0/hp002.png",
      },
      {
        title: "Batman",
        imgSrc: "https://img.bricklink.com/ItemImage/MN/0/bat001.png",
      },
      {
        title: "Luke Skywalker",
        imgSrc: "https://img.bricklink.com/ItemImage/MN/0/sw001.png",
      },
    ],
    parts: [
      {
        title: "2x4 Brick Red",
        imgSrc: "https://img.bricklink.com/ItemImage/PN/5/3001.png",
      },
      {
        title: "1x1 Brick White",
        imgSrc: "https://img.bricklink.com/ItemImage/PN/1/3005.png",
      },
      {
        title: "2x2 Plate Blue",
        imgSrc: "https://img.bricklink.com/ItemImage/PN/7/3022.png",
      },
      {
        title: "Slope 1x2",
        imgSrc: "https://img.bricklink.com/ItemImage/PN/11/3040.png",
      },
    ],
  };

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      // Only fetch if API key is available
      if (!import.meta.env.VITE_REBRICKABLE_API_KEY) {
        setSets(galleryImages[activeCategory]);
        return;
      }

      setLoadingSets(true);
      setSetsError(null);

      try {
        let itemPromises = [];

        if (activeCategory === "sets") {
          itemPromises = featuredSetNumbers.map((setNum) =>
            galleryService.getLegoset(setNum)
          );
        } else if (activeCategory === "minifigs") {
          itemPromises = featuredMinifigNumbers.map((figNum) =>
            galleryService.getMinifig(figNum)
          );
        } else if (activeCategory === "parts") {
          // For parts, we'll use the first set to get its parts
          try {
            const partsData = await galleryService.getParts(
              featuredSetNumbers[0]
            );
            setSets(partsData.results || []);
            setLoadingSets(false);
            return;
          } catch (error) {
            console.error("Error fetching parts:", error);
            setSets(galleryImages.parts);
            setLoadingSets(false);
            return;
          }
        }

        const fetchedItems = await Promise.allSettled(itemPromises);

        const validItems = fetchedItems
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        setSets(validItems);
      } catch (error) {
        console.error(`Error fetching featured ${activeCategory}:`, error);
        setSetsError(`Failed to load featured ${activeCategory}`);
        // Fall back to static gallery
        setSets(galleryImages[activeCategory]);
      } finally {
        setLoadingSets(false);
      }
    };

    fetchFeaturedItems();
  }, [activeCategory]); // Re-fetch when category changes

  // Function to normalize gallery items for display
  const normalizeGalleryItems = (items) => {
    if (!items || items.length === 0) return [];

    return items.map((item) => {
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
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentSlide(0); // Reset carousel when category changes
  };

  // Carousel navigation functions
  const itemsPerSlide = 4; // Number of items to show per slide

  const nextSlide = () => {
    const normalizedItems = normalizeGalleryItems(sets);
    const maxSlides = Math.ceil(normalizedItems.length / itemsPerSlide);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    const normalizedItems = normalizeGalleryItems(sets);
    const maxSlides = Math.ceil(normalizedItems.length / itemsPerSlide);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const normalizedItems = normalizeGalleryItems(sets);
    const totalSlides = Math.ceil(normalizedItems.length / itemsPerSlide);

    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sets, isAutoPlaying, activeCategory]);

  return (
    <PageView title="Home" showFooter={true} className="">
      {/* Hero Section */}
      <section className="relative mb-16 pt-8 bg-gradient-to-br ">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')] opacity-10"></div>
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
              Check out rare finds!
              <br />
              Bring Your <span className="text-red-600">Happiness</span> Home
            </h1>
            <p className="text-xl text-gray-600 max-w-prose mt-6 leading-relaxed">
              Discover unique and limited-edition collectibles. Whether you're a
              builder or a collector, we've curated pieces to spark your joy and
              complete your collection.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <button className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                🛒 Shop Now
              </button>
              <a
                href="#gallery"
                className="w-full sm:w-auto text-black hover:text-red-600 font-medium py-4 px-8 border-2 border-black hover:border-red-600 rounded-lg transition-colors duration-200 text-center"
              >
                🖼️ Browse Gallery
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Builders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5K+</div>
                <div className="text-sm text-gray-600">Rare Sets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-300 rounded-full animate-bounce delay-500"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-blue-300 rounded-full animate-pulse"></div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0"
                  alt="Colorful build preview"
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="w-full bg-gradient-to-r py-12 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')] opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Featured Gallery
              </h2>
              
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Category tabs - enhanced */}
              <button
                onClick={() => handleCategoryChange("sets")}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  activeCategory === "sets"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/80 hover:bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                🏗️ Sets
              </button>
              <button
                onClick={() => handleCategoryChange("minifigs")}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  activeCategory === "minifigs"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/80 hover:bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                👤 Minifigs
              </button>
              <button
                onClick={() => handleCategoryChange("parts")}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  activeCategory === "parts"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/80 hover:bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                🔧 Parts
              </button>
            </div>
          </div>

         
          {(() => {
            const itemsWithImages = normalizeGalleryItems(sets);

            // Show skeleton loading cards while loading
            if (loadingSets) {
              return (
                <div className="relative">
                  <div className="overflow-hidden rounded-xl">
                    <div className="flex gap-6 py-6">
                      {Array.from({ length: itemsPerSlide }, (_, index) => (
                        <div
                          key={`skeleton-${index}`}
                          className="flex-none w-60 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse"
                        >
                          {/* Image skeleton */}
                          <div className="w-full h-48 rounded-lg bg-gray-200"></div>
                          
                          {/* Content skeleton */}
                          <div className="mt-3 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                              <div className="h-4 w-4 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (!itemsWithImages.length) {
              return (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    No {activeCategory} available
                  </div>
                  <div className="text-gray-600 text-center max-w-md">
                    We're working hard to add more {activeCategory} to our collection. 
                    Check back soon or try a different category!
                  </div>
                  <button 
                    onClick={() => handleCategoryChange('sets')} 
                    className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Browse Sets Instead
                  </button>
                </div>
              );
            }

            const totalSlides = Math.ceil(
              itemsWithImages.length / itemsPerSlide
            );
            const startIndex = currentSlide * itemsPerSlide;
            const currentItems = itemsWithImages.slice(
              startIndex,
              startIndex + itemsPerSlide
            );

            return (
              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden rounded-xl">
                  <div
                    className="flex gap-6 py-6 transition-transform duration-500 ease-in-out"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    {currentItems.map((item, index) => (
                      <div
                        key={startIndex + index}
                        className="flex-none w-60 bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-gray-100"
                      >
                        <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative group">
                          <img
                            src={item.imgSrc}
                            alt={item.title}
                            title={item.title}
                            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/200x200?text=No+Image";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="mt-3">
                          <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                            {item.title}
                          </h3>
                          {item.setNum && (
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                              {activeCategory === "sets"
                                ? "🏗️ Set #"
                                : activeCategory === "minifigs"
                                ? "👤 Fig #"
                                : "🔧 Part #"}
                              {item.setNum}
                            </div>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <button className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">
                              View Details
                            </button>
                            <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                              ❤️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 rounded-full p-3 shadow-xl z-20 transition-all duration-200 transform hover:scale-110 border-2 border-gray-200"
                      aria-label="Previous slide"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 rounded-full p-3 shadow-xl z-20 transition-all duration-200 transform hover:scale-110 border-2 border-gray-200"
                      aria-label="Next slide"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Pagination Dots */}
                {totalSlides > 1 && (
                  <div className="flex justify-center mt-6 space-x-3">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          currentSlide === index
                            ? "w-8 h-3 bg-white shadow-lg"
                            : "w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-125"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              🌟 Why Builders Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied builders and collectors worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Limited Editions
              </h3>
              <p className="text-gray-600">
                Rare builds & exclusive drops that you won't find anywhere else
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Sellers
              </h3>
              <p className="text-gray-600">
                Trusted community vendors with 100% authenticity guarantee
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Get your sets quickly with express delivery options
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Competitive pricing with price-match guarantee
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600">
                24/7 customer support from LEGO enthusiasts
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day return policy with free return shipping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community & CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Join Our Amazing
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Builder Community
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                Connect with fellow builders and collectors worldwide. Share
                builds, trade pieces, and find inspiration for your next
                masterpiece.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                    +5K
                  </div>
                </div>
                <span className="text-gray-300">
                  Active builders this month
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  🚀 Start Building Today
                </button>
                <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-black transition-all duration-200">
                  💬 Join Community
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.317kupd1guYqy0hQRKSkxQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Community showcase"
                    className="w-full rounded-xl shadow-2xl object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📧 Stay Updated with New Arrivals
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get exclusive access to rare sets, early-bird discounts, and
              builder tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </PageView>
  );
};

export default Home;
