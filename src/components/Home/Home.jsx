import React from 'react';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';

const Home = () => {
  const galleryImages = [
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Check out rare finds! <br />
              Bring Your <span className="text-red-600">Happiness</span> Home!
            </h2>
            <p className="text-lg text-gray-600">
              Discover unique and limited-edition collectibles. Whether you're a builder or a collector, we’ve got something that sparks joy.
            </p>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://th.bing.com/th/id/R.d6465632cd4352f092717b8a7dbc75f6?rik=%2fvqGGQAigA182w&pid=ImgRaw&r=0"
              alt="Hero preview"
              className="w-full h-auto "
            />
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-yellow-300 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto rounded-md object-cover"
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col lg:flex-row items-center gap-8 mb-16 mt-16">
        <div className="flex-1">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.317kupd1guYqy0hQRKSkxQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Hero preview"
              className="w-full h-auto "
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Check out rare finds! <br />
              Bring Your <span className="text-red-600">Happiness</span> Home!
            </h2>
            <p className="text-lg text-gray-600">
              Discover unique and limited-edition collectibles. Whether you're a builder or a collector, we’ve got something that sparks joy.
            </p>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
        </section>

      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
