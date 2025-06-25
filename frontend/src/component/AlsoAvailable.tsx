import { useFetchRandomProductsQuery } from "../redux/features/product/productApi";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const AlsoAvailable = () => {
  const {
    data: randomProducts = [],
    isLoading,
    error,
  } = useFetchRandomProductsQuery(5); // Fetch 5 random products
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
    },
  });
  return (
    <div className="px-4 md:px-8 py-10 mt-14 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">You May Also Like</h2>
        <Link
          to="/explore"
          className="text-pink-500 font-semibold hover:underline text-sm"
        >
          Explore
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-xl"></div>
              <div className="mt-2 px-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center">
          Failed to load recommendations. Please try again later.
        </p>
      )}

      {!isLoading && !error && randomProducts.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {randomProducts.map((product) => (
            <div
              key={product._id}
              className="keen-slider__slide group relative"
            >
              <Link to={`/product-details/${product._id}`}>
                <div className="relative overflow-hidden rounded-xl shadow-sm">
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 px-2">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-900 mt-1">
                    ${product.price}
                  </p>
                </div>
              </Link>

              {/* Wishlist Button */}
              <button
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:scale-105 transition"
                onClick={() => {
                  console.log("Add to wishlist", product._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.318 6.318a4.5 4.5 0 016.364 0L12 6.94l.318-.622a4.5 4.5 0 116.364 6.364L12 20.25l-6.682-6.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlsoAvailable;
