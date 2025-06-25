import { art, interior2 } from "../assets";

const HeroSection = () => {
  return (
    <section className="bg-yellow-200 relative py-8 px-4 md:px-12 overflow-hidden -mt-[8.8rem]">
      <div className="absolute inset-0 border-y-8 border-yellow-400 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 items-center gap-8">
        {/* Left Image */}
        <div className="relative w-full h-72 md:h-96">
          <img
            src={art}
            alt="Logo Design Sample"
            className="absolute inset-0 w-full h-full object-cover rounded z-10"
          />
        </div>

        {/* Center Content */}
        <div className="text-center md:col-span-1">
          <h2 className="text-3xl font-bold text-blue-700">
            Every Piece Tells a Story
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Custom frames, logos, art & decor to style your space beautifully.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-purple-100 transition">
            Shop Designs
          </button>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-72 md:h-96">
          <img
            src={interior2}
            alt="Creative Work"
            className="absolute inset-0 w-full h-full object-cover rounded z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
