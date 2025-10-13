import React, { useState } from "react";
import PageView from "../Common/PageView/PageView";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Category data matching the image
  const categories = [
    {
      title: "Adult",
      description: "Discover sophisticated and challenging LEGO sets designed for adult builders, including architecture, vehicles, and detailed models for discerning LEGO enthusiasts.",
      image: "https://images.brickset.com/sets/images/10234-1.jpg", // Sydney Opera House
      count: "150+ sets"
    },
    {
      title: "Animals", 
      description: "Explore the animal kingdom with LEGO Creator 3-in-1 sets, wildlife builds, and creature collections featuring everything from dinosaurs to dolphins.",
      image: "https://images.brickset.com/sets/images/31088-1.jpg", // Deep Sea Creatures
      count: "80+ sets"
    },
    {
      title: "Arts And Craft",
      description: "Unleash your creativity with artistic LEGO builds, from sculptures and mosaics to creative building techniques and decorative models.",
      image: "https://images.brickset.com/sets/images/21226-1.jpg", // Art Project
      count: "45+ sets"  
    },
    {
      title: "Building",
      description: "Master the fundamentals with classic building sets, modular buildings, cityscapes, and architectural marvels that showcase construction techniques.",
      image: "https://images.brickset.com/sets/images/10264-1.jpg", // Corner Garage
      count: "200+ sets"
    },
    {
      title: "Cars",
      description: "Race into adventure with sports cars, classic vehicles, Formula 1 racers, and automotive legends recreated in LEGO form.",
      image: "https://images.brickset.com/sets/images/42096-1.jpg", // Porsche 911 RSR
      count: "120+ sets"
    },
    {
      title: "Characters", 
      description: "Meet your favorite heroes and characters from movies, TV shows, and original LEGO themes in minifigure form and character-based sets.",
      image: "https://images.brickset.com/sets/images/71039-1.jpg", // Disney Series 2
      count: "300+ sets"
    },
    {
      title: "Mech",
      description: "Pilot powerful mechs and robotic warriors with articulated joints, weaponry, and futuristic designs for epic battles and adventures.",
      image: "https://images.brickset.com/sets/images/76164-1.jpg", // Iron Man Hulkbuster
      count: "60+ sets"
    },
    {
      title: "Movies",
      description: "Recreate iconic scenes and vehicles from blockbuster films including Star Wars, Marvel, DC, Harry Potter, and more cinematic adventures.",
      image: "https://images.brickset.com/sets/images/70840-1.jpg", // LEGO Movie 2
      count: "180+ sets"
    },
    {
      title: "Weapons and Parts",
      description: "Enhance your builds with specialized weapons, custom parts, and building elements to create unique MOCs and upgrade existing sets.",
      image: "https://images.brickset.com/sets/images/852743-1.jpg", // Weapons Pack
      count: "500+ parts"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageView title="Discover" showFooter={true} className="">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover</h1>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <div className="h-48  flex items-center justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200x150?text=LEGO";
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  <span className="text-sm text-blue-600 font-medium">{category.count}</span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                {/* Explore Button */}
                <div className="mt-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 flex items-center group">
                    Explore category
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </PageView>
  );
};

export default Discover;
