import React, { useState } from "react";
import PageView from "../Common/PageView/PageView";
import legoMovieImage from "../../assets/legomovie.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', surname: '', email: '', message: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  return (
    <PageView title="Contact" showFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Hey! How can we help you?
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - LEGO Character and Info */}
            <div className="space-y-8">
              {/* LEGO Character Section */}
              <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-6 md:space-y-0 mb-8">
                {/* LEGO Image - Left Side */}
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                  <img 
                    src={legoMovieImage} 
                    alt="LEGO Character" 
                    className="w-64 md:w-80 lg:w-96 h-auto object-contain"
                  />
                </div>
                
                {/* Text Content - Right Side */}
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4">
                    Check out for rare finds! Bring Your 
                    <span className="text-red-500"> Happiness Home!</span>
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit, sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat.
                  </p>
                  <button className="bg-black hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors duration-200 shadow-lg">
                    Contact Us!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Contact Form (Left) and Data Safety (Right) */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Contact Form */}
            <div>
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-green-700 font-medium">Message sent successfully!</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm bg-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="surname">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm bg-white"
                  placeholder="Your surname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm bg-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-sm bg-white"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 text-sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
            </div>

            {/* Right Side - Data Safety Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  How we keep your data safe
                </h3>
                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We're committed to treating your personal info with 
                    care, trust and respect. We've created our privacy 
                    policy to provide transparency into our practices 
                    and policies.
                  </p>
                </div>
                <button className="bg-black hover:bg-gray-900 text-white font-medium px-4 py-2 rounded text-sm transition-colors duration-200">
                  Learn more →
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </PageView>
  );
};

export default Contact;
