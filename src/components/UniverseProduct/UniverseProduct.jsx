import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as galleryService from "../../services/galleryService";
import PageView from "../Common/PageView/PageView";
import marvelImage from '../../assets/marvel.png';
import dcImage from '../../assets/dc.png';
import starwarsImage from '../../assets/starwars.png';
import ninjagoImage from '../../assets/ninjago.png';
import disneyImage from '../../assets/disney.png';
import legoMovieImage from '../../assets/legomovie.png';

import dclogoImage from '../../assets/logo/dclogo.png';
import marvelLogoImage from '../../assets/logo/marvellogo.png';
import starwarsLogoImage from '../../assets/logo/starwarslogo.png';
import ninjagoLogoImage from '../../assets/logo/ninjagologo.png';
import disneyLogoImage from '../../assets/logo/disneylogo.png';
import legoMovieLogoImage from '../../assets/logo/legomovielogo.png';
const UniverseProduct = () => {
  const { universe } = useParams();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set()); // Track failed images
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const universes = [
    {
      id: "marvel",
      name: "Marvel Studios",
      image: marvelImage,
      logo: marvelLogoImage,
      backgroundColor: "bg-black",
      textColor: "text-white",
      description: "Superheroes and villains from the Marvel universe",
    },
    {
      id: "dc",
      name: "DC",
      image: dcImage,
      logo: dclogoImage,
      backgroundColor: "bg-blue-600",
      textColor: "text-white",
      description: "Batman, Superman and DC Comics heroes",
    },
    {
      id: "starwars",
      name: "Star Wars",
      image: starwarsImage,
      logo: starwarsLogoImage,
      backgroundColor: "bg-black",
      textColor: "text-white",
      description: "A galaxy far, far away...",
    },
    {
      id: "ninjago",
      name: "Ninjago",
      image: ninjagoImage,
      logo: ninjagoLogoImage,
      backgroundColor: "bg-red-500",
      textColor: "text-white",
      description: "Masters of Spinjitzu",
    },
    {
      id: "disney",
      name: "Disney+",
      image: disneyImage,
      logo: disneyLogoImage,
      backgroundColor: "bg-black",
      textColor: "text-white",
      description: "Magical Disney characters and stories",
    },
    {
      id: "legomovie",
      name: "LEGO Movie",
      image: legoMovieImage,
      logo: legoMovieLogoImage,
      backgroundColor: "bg-orange-500",
      textColor: "text-white",
      description: "Build, rebuild, and build again",
    },
  ];
  // Function to handle page changes with scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await galleryService.getLegoLists("sets", currentPage);
        setSets(results.results || []);
        setTotalCount(results.count || 0);
        // Calculate total pages (assuming API returns count)
        setTotalPages(
          Math.ceil((results.count || 0) / (results.results?.length || 20))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, [currentPage]);

  const normalizeGalleryItems = (items) => {
    return galleryService.normalizeGalleryItems(items, failedImages);
  };

  // Function to handle image load errors
  const handleImageError = (imgSrc) => {
    setFailedImages((prev) => new Set([...prev, imgSrc]));
  };

  // Handle view details click
  const handleViewDetails = (item) => {
    console.log("View details for:", item);
    // Add navigation logic here
  };

  // Handle favorite click
  const handleFavorite = (item) => {
    console.log("Favorite clicked for:", item);
    // Add favorite logic here
  };

  // Handle universe click (not used in this component but needed for compatibility)
  const handleUniverseClick = (universe) => {
    console.log("Universe clicked:", universe);
  };

  // Find current universe data
  const currentUniverse = universes.find(u => u.id === universe) || universes[0];

  return (
    <PageView title={currentUniverse.name} showFooter={true}>
      <div className="min-h-screen bg-white">
        {/* Header with Universe Branding */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Universe Title and Logo */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <img 
                  src={currentUniverse.logo} 
                  alt={currentUniverse.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Universe Logo (Mobile) */}
            <div className="lg:hidden flex justify-center">
              <div className={`${currentUniverse.backgroundColor} rounded-lg p-3`}>
                <img 
                  src={currentUniverse.logo} 
                  alt={currentUniverse.name}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex relative">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[50] lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
            fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out 
            w-64 bg-white shadow-xl lg:shadow-none p-6 border-r border-gray-200 
            h-screen lg:h-auto overflow-y-auto inset-y-0 left-0
            ${isSidebarOpen ? "translate-x-0 z-[60]" : "-translate-x-full"}
          `}
          >
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Keywords Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Keywords
            </h3>
            <div className="space-y-2 text-sm">
              {[
                "Adult",
                "Animals",
                "Ants and Crafts",
                "Building",
                "Cars",
                "Collectible",
                "March",
                "Marvels",
                "Weapons and Parts",
              ].map((keyword, index) => (
                <label key={index} className="flex items-center hover:bg-gray-50 p-1 rounded">
                  <input 
                    type="checkbox" 
                    className="mr-3 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500" 
                  />
                  <span className="text-gray-700 text-sm">{keyword}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Theme</h3>
            <div className="space-y-2 text-sm">
              {[
                "All",
                "Age according...",
                "Building",
              ].map((theme, index) => (
                <label key={index} className="flex items-center hover:bg-gray-50 p-1 rounded">
                  <input 
                    type="checkbox" 
                    className="mr-3 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    defaultChecked={theme === "All"}
                  />
                  <span className="text-gray-700 text-sm">{theme}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters Button (Mobile) */}
          <div className="lg:hidden mt-6">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6 min-w-0">
            {/* Universe Hero Banner */}
            <div className={`${currentUniverse.backgroundColor} rounded-xl p-6 mb-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <img 
                    src={currentUniverse.logo} 
                    alt={currentUniverse.name}
                    className="h-12 w-auto object-contain mb-3"
                  />
                  <p className={`text-sm ${currentUniverse.textColor} opacity-90`}>
                    {currentUniverse.description}
                  </p>
                </div>
                <div className="ml-6">
                  <img 
                    src={currentUniverse.image} 
                    alt={currentUniverse.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 16 }, (_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
                >
                  <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❌</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                Oops! Something went wrong
              </div>
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {normalizeGalleryItems(sets).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => handleViewDetails(item)}
                >
                  {/* Product Image */}
                  <div className="w-full h-40 flex items-center justify-center mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        handleImageError(item.imgSrc);
                        e.currentTarget.parentElement.parentElement.style.display = "none";
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.setNum && `Set ${item.setNum}`}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-green-600 font-medium">In Stock</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(item);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && normalizeGalleryItems(sets).length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                No trending sets available
              </div>
              <p className="text-gray-600">
                Check back later for the latest trending LEGO sets!
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-1">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                ‹ Prev
              </button>

              {/* Page Numbers */}
              {(() => {
                const pages = [];
                const maxVisiblePages = 7;
                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxVisiblePages / 2)
                );
                let endPage = Math.min(
                  totalPages,
                  startPage + maxVisiblePages - 1
                );

                // Adjust start page if we're near the end
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                // Always show first page
                if (startPage > 1) {
                  pages.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <span
                        key="start-ellipsis"
                        className="px-2 py-1 text-sm text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                }

                // Show page numbers in range
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-3 py-1 text-sm rounded ${
                        i === currentPage
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                // Always show last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span
                        key="end-ellipsis"
                        className="px-2 py-1 text-sm text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}

              {/* Next Button */}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Next ›
              </button>
            </div>
          )}

          {/* Page Info */}
          {totalCount > 0 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} ({totalCount} total sets)
            </div>
          )}
          </div>
        </div>
      </div>
    </PageView>
  );
};

export default UniverseProduct;
