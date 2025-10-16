import PageView from "../Common/PageView/PageView";
import ninjagoImage from "../../assets/ninjago.png";
import marvelImage from "../../assets/marvel.png";
const Help = () => {
  return (
    <PageView title="Help" showFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* First Section - Help & Support */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                  Help & Support –
                  <br />
                  <span className="block">BricksterBuilder</span>
                </h1>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Welcome to the BricksterBuilder Help Center! We're here to
                  make your LEGO shopping smooth, simple, and fun. Whether
                  you're hunting for rare sets, browsing our ads, or checking
                  promotions, this page has you covered.
                </p>
              </div>
            </div>

            {/* Right Side - LEGO Doctor Character */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* LEGO Doctor Minifigure */}
                <img
                  src={ninjagoImage}
                  alt="Ninjago Character"
                  className="w-64 md:w-80 lg:w-96 h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* About BricksterBuilder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Happy LEGO Character */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <img
                  src={marvelImage}
                  alt="Marvel Character"
                  className="w-64 md:w-80 lg:w-96 h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Side - About Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                  About
                  <br />
                  <span className="block">BricksterBuilder</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 text-base leading-relaxed">
                    BricksterBuilder is an independent LEGO reseller bringing
                    you authentic sets, rare finds, and creative building
                    collections—all showcased through our advertising page.
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed">
                    All sets we sell are 100% genuine LEGO products, sourced
                    from trusted distributors and collectors.
                  </p>
                </div>
                <button className="mt-4 w-full sm:w-auto bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageView>
  );
};

export default Help;
