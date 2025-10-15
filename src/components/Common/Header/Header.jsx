import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-2 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6 transition-transform duration-200 rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>

        {/* Logo */}
        <a href="/" className="text-2xl lg:text-3xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
          {/* <div className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200">
            <span className="text-white font-bold text-lg">B</span>
          </div> */}
          <span>BricksterBuilder</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a href="/" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Home</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
          <a href="/discover" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Discover</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
          <a href="/trending" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Trending</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
          <a href="/universe" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Universe</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
          <a href="/contact" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Contact</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
          <a href="/help" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group">
            <span className="relative z-10">Help</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </a>
        </nav>

        {/* CTA Button */}
        <div className="block">
          <button className="relative overflow-hidden bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 md:py-2.5 md:px-6 lg:py-3 lg:px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group text-sm md:text-base">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <a href="/" className="relative z-10 flex items-center space-x-1 md:space-x-2 text-white">
              <span className="hidden sm:inline">Shop Now!</span>
              <span className="sm:hidden">Shop</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
          <ul className="flex flex-col p-6 space-y-1">
            <li>
              <a href="/" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="/discover" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                🔍 Discover
              </a>
            </li>
            <li>
              <a href="/trending" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                🔥 Trending
              </a>
            </li>
            <li>
              <a href="/universe" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                🌌 Universe
              </a>
            </li>
            <li>
              <a href="/contact" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                📧 Contact
              </a>
            </li>
            <li>
              <a href="/help" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                ❓ Help
              </a>
            </li>
            <li className="pt-4 border-t border-gray-200/50 mt-4">
              <button className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group">
                <a href="/" className="flex items-center justify-center space-x-2 text-white">
                  <span>🛒 Shop Now!</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </a>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
