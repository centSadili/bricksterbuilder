import React, { useState } from "react";
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
const Universe = () => {
  const [selectedUniverse, setSelectedUniverse] = useState(null);

  // LEGO Universe themes data
  const universes = [
    {
      id: 'marvel',
      name: 'Marvel Studios',
      image: marvelImage,
      logo: marvelLogoImage,
      backgroundColor: 'bg-black',
      textColor: 'text-white',
      description: 'Superheroes and villains from the Marvel universe'
    },
    {
      id: 'dc',
      name: 'DC',
      image: dcImage,
      logo: dclogoImage,
      backgroundColor: 'bg-blue-600', 
      textColor: 'text-white',
      description: 'Batman, Superman and DC Comics heroes'
    },
    {
      id: 'starwars',
      name: 'Star Wars',
      image: starwarsImage,
      logo: starwarsLogoImage,
      backgroundColor: 'bg-black',
      textColor: 'text-white',
      description: 'A galaxy far, far away...'
    },
    {
      id: 'ninjago',
      name: 'Ninjago',
      image: ninjagoImage, 
      logo: ninjagoLogoImage,
      backgroundColor: 'bg-red-500',
      textColor: 'text-white',
      description: 'Masters of Spinjitzu'
    },
    {
      id: 'disney',
      name: 'Disney+',
      image: disneyImage,
      logo: disneyLogoImage,
      backgroundColor: 'bg-black',
      textColor: 'text-white',
      description: 'Magical Disney characters and stories'
    },
    {
      id: 'legomovie',
      name: 'LEGO Movie',
      image: legoMovieImage,
      logo: legoMovieLogoImage,
      backgroundColor: 'bg-orange-500',
      textColor: 'text-white',
      description: 'Build, rebuild, and build again'
    }
  ];

  const handleUniverseClick = (universe) => {
    setSelectedUniverse(universe);
    // Here you could navigate to a detailed universe page
    console.log('Selected universe:', universe.name);
  };

  return (
    <PageView title="Universe" showFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Universe
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore different LEGO universes and discover amazing sets from your favorite themes
            </p>
          </div>

          {/* Universe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {universes.map((universe) => (
              <div
                key={universe.id}
                onClick={() => handleUniverseClick(universe)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`
                  relative rounded-xl overflow-hidden shadow-lg h-48 
                  ${universe.backgroundColor} 
                  flex items-center justify-between p-6
                `}>
                  {/* Background pattern/texture overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  
                  {/* Left side - Text Content */}
                  <div className="relative z-10 flex-1">
                    
                    <img 
                      src={universe.logo} 
                      alt="" 
                      className="h-12 w-auto object-contain mb-3"
                    />
                    <p className={`
                      text-sm opacity-90 
                      ${universe.textColor}
                      group-hover:opacity-100 
                      transition-all duration-300
                    `}>
                      {universe.description}
                    </p>
                  </div>

                  {/* Right side - Character Image */}
                  <div className="relative z-10 ml-4">
                    {universe.image ? (
                      <img 
                        src={universe.image} 
                        alt={universe.name} 
                        className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">🧱</span>
                      </div>
                    )}
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="
                    absolute top-4 right-4 
                    transform translate-x-8 opacity-0 
                    group-hover:translate-x-0 group-hover:opacity-100 
                    transition-all duration-300
                  ">
                    <svg 
                      className={`w-6 h-6 ${universe.textColor}`}
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
                  </div>
                </div>

                {/* Optional: Stats or info below each card */}
                <div className="mt-4 px-2">
                  <div className="text-sm text-gray-500 text-center">
                    {universe.name}
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Can't Find Your Universe?
              </h2>
              <p className="text-gray-600 mb-6">
                Discover more LEGO themes and sets in our complete catalog
              </p>
              <button className="
                bg-blue-600 hover:bg-blue-700 
                text-white font-semibold 
                px-8 py-3 rounded-lg 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-lg
              ">
                Browse All Sets
              </button>
            </div>
          </div>

          {/* Selected Universe Modal/Info (optional) */}
          {selectedUniverse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{selectedUniverse.name}</h3>
                  <button 
                    onClick={() => setSelectedUniverse(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-6">{selectedUniverse.description}</p>
                <button 
                  onClick={() => setSelectedUniverse(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Explore {selectedUniverse.name} Sets
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageView>
  );
};

export default Universe;
