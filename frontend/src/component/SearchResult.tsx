import { useFetchAllProductsQuery } from "../redux/features/product/productApi";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";

interface Product {
  _id: string;
  title: string;
  image: string[];
  price: string;
  category?: "frame" | "painting" | "decor" | "furniture"; // ✅ category made optional
}

const SearchResult = () => {
  const dispatch = useDispatch();

  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useFetchAllProductsQuery();

  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
  }, [allProducts, searchQuery]);

  return (
    <div className="px-4 md:px-8 py-10 lg:mt-8 max-w-7xl mx-auto">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Search Results for {searchQuery}
      </h2>

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

      {!isLoading && error && (
        <p className="text-red-500 text-center">
          Failed to load search results. Please try again later.
        </p>
      )}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found for "{searchQuery}"
        </p>
      )}

      {!isLoading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product: Product) => (
            <div key={product._id} className="group relative">
              <Link to={`/product-details/${product._id}`}>
                <div className="relative overflow-hidden rounded-xl shadow-sm">
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </Link>

              <div className="mt-2 px-2">
                <Link to={`/product-details/${product._id}`}>
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-sm font-semibold text-indigo-900 mt-1">
                  ₦{product.price}
                </p>

                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product._id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image[0],
                        quantity: 1,
                        category: product.category ?? "decor", // ✅ fallback
                      })
                    )
                  }
                  className="mt-2 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors mb-5"
                >
                  Add to Cart
                </button>
              </div>

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

export default SearchResult;
