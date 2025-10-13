import React from 'react';

const LegoCard = ({ 
  item, 
  activeCategory, 
  onImageError,
  onViewDetails,
  onFavorite,
  isLoading = false
}) => {
  // Skeleton loading card
  if (isLoading) {
    return (
      <div className="flex-none w-60 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse">
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
    );
  }
  const getCategoryIcon = () => {
    switch (activeCategory) {
      case "sets":
        return "🏗️ Set #";
      case "minifigs":
        return "👤 Fig #";
      case "parts":
        return "🔧 Part #";
      default:
        return "🔧 #";
    }
  };

  const handleImageError = (e) => {
    if (onImageError) {
      onImageError(item.imgSrc);
    }
    // Hide the entire card instead of showing placeholder
    e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none';
  };

  const handleImageLoad = (e) => {
    // Ensure the image actually loaded content (not a broken image)
    if (e.currentTarget.naturalWidth === 0 || e.currentTarget.naturalHeight === 0) {
      handleImageError(e);
    }
  };

  return (
    <div className="flex-none w-60 bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative group">
        <img
          src={item.imgSrc}
          alt={item.title}
          title={item.title}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
          {item.title}
        </h3>
        
        {item.setNum && (
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
            {getCategoryIcon()}{item.setNum}
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between">
          <button 
            className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => onViewDetails && onViewDetails(item)}
          >
            View Details
          </button>
          <button 
            className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            onClick={() => onFavorite && onFavorite(item)}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegoCard;