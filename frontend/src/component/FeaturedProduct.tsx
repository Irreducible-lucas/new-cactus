import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useFetchRandomProductsQuery } from "../redux/features/product/productApi";

const FeaturedProduct: React.FC = () => {
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

  const {
    data: featuredProducts = [],
    isLoading,
    error,
  } = useFetchRandomProductsQuery(5);

  return (
    <div className="w-full px-8 mt-14">
      <h2 className="text-2xl font-bold mb-8">Featured Products</h2>

      {isLoading && <p>Loading featured products...</p>}
      {error && <p className="text-red-500">Failed to load products.</p>}

      {!isLoading && !error && featuredProducts.length === 0 && (
        <p className="text-gray-500">No featured products found.</p>
      )}

      {!isLoading && !error && featuredProducts.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="keen-slider__slide bg-white rounded shadow-md transition-transform hover:scale-105"
            >
              <a href={`/product-details/${product._id}`}>
                <img
                  src={product.image?.[0] || "/default.jpg"}
                  alt={product.title || "Product Image"}
                  className="h-48 w-full object-cover rounded-t"
                />
                <div className="p-3">
                  <h3 className="mt-2 text-sm font-semibold h-12 line-clamp-2">
                    {product.title || "Untitled Product"}
                  </h3>
                  <p className="mt-1 font-bold text-blue-700">
                    {product.price || "N/A"}
                  </p>
                  <span className="text-xs text-gray-500">
                    {product.productTag || "No Tag"}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;
