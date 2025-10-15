import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand / About */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BricksterBuilder
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Unleash your creativity with premium LEGO sets and building experiences. 
              From classic collections to exclusive designs, build your dreams brick by brick.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="text-sm text-gray-300">4.8/5 Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500"></div>
            </h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
              </a></li>
              <li><a href="/discover" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Discover</span>
              </a></li>
              <li><a href="/trending" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Trending</span>
              </a></li>
              <li><a href="/universe" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Universe</span>
              </a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
              </a></li>
              <li><a href="/help" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform duration-200">Help</span>
              </a></li>
            </ul>
          </div>

          {/* Connect & Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Connect With Us
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-500"></div>
            </h3>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324c.807-.807 1.958-1.297 3.255-1.297s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.807.807-1.958 1.297-3.255 1.297zm7.718 0c-1.297 0-2.448-.49-3.324-1.297-.807-.807-1.297-1.958-1.297-3.255s.49-2.448 1.297-3.324c.807-.807 1.958-1.297 3.255-1.297s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.807.807-1.958 1.297-3.255 1.297z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Stay updated with our latest sets</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors duration-200 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} BricksterBuilder. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
              <a href="/cookies" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
