import React, { useEffect, useState } from 'react'
import * as galleryService from "../../services/galleryService";
import PageView from '../Common/PageView/PageView';
import LegoCard from '../Common/Cards/LegoCard';

const Trending = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set()); // Track failed images
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  useEffect(() => {
   
    const fetchSets = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await galleryService.getLegoLists("sets",6);
        setSets(results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  const normalizeGalleryItems = (items) => {
    return galleryService.normalizeGalleryItems(items, failedImages);
  };

  // Function to handle image load errors
  const handleImageError = (imgSrc) => {
    setFailedImages(prev => new Set([...prev, imgSrc]));
  };

  // Handle view details click
  const handleViewDetails = (item) => {
    console.log('View details for:', item);
    // Add navigation logic here
  };

  // Handle favorite click
  const handleFavorite = (item) => {
    console.log('Favorite clicked for:', item);
    // Add favorite logic here
  };

  return (
    <PageView title="Trending" showFooter={true}>
      <div className="flex min-h-screen bg-gray-50 relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[50] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out 
          w-64 bg-white shadow-xl lg:shadow-sm p-6 border-r border-gray-200 
          h-screen lg:h-auto overflow-y-auto inset-y-0 left-0
          ${isSidebarOpen ? 'translate-x-0 z-[60]' : '-translate-x-full'}
        `}>
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Keywords</h3>
            <div className="space-y-2 text-sm">
              {['Anime', 'Avatar', 'Brickheadz', 'Building', 'City', 'Collectibles', 'Creator', 'Ideas', 'Marvel', 'Miniatures and Parts'].map((keyword, index) => (
                <label key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2 text-blue-600" />
                  <span className="text-gray-700">{keyword}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Theme</h3>
            <div className="space-y-2 text-sm">
              {['All', 'Age according...', 'Architecture', 'Avatar', 'Batman', 'Bionicle', 'BrickHeadz', 'Building'].map((theme, index) => (
                <label key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2 text-blue-600" />
                  <span className="text-gray-700">{theme}</span>
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
        <div className="flex-1 p-4 lg:p-6 w-full min-w-0">
          {/* Header */}
          <div className="mb-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Trending</h1>
              
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors relative z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 16 }, (_, index) => (
                <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
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
              <div className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</div>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {normalizeGalleryItems(sets.results || sets).map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="w-full h-32 flex items-center justify-center mb-3 bg-gray-50 rounded">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        handleImageError(item.imgSrc);
                        e.currentTarget.parentElement.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {item.setNum && `#${item.setNum}`}
                  </p>
                  <p className="text-xs text-gray-400">In Stock</p>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && normalizeGalleryItems(sets.results || sets).length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">No trending sets available</div>
              <p className="text-gray-600">Check back later for the latest trending LEGO sets!</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
            <span className="px-3 py-1 text-sm text-gray-500">...</span>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">67</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">69</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 ml-2">Next ›</button>
          </div>
        </div>
      </div>
    </PageView>
  );
}

export default Trending
