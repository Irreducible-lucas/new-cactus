import React from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  image: string[];
  price: string;
}

interface ExploreGridProps {
  title: string;
  products: Product[];
  seeMoreLink?: string;
  loading?: boolean;
  error?: boolean;
}

const ExploreGrid: React.FC<ExploreGridProps> = ({
  title,
  products,
  seeMoreLink = "#",
  loading = false,
  error = false,
}) => {
  return (
    <div className="w-full px-4 md:px-8 my-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <a href={seeMoreLink} className="text-red-500 hover:text-blue-700">
          See More
        </a>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load products.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/product-details/${product._id}`}>
              <div
                key={product._id}
                className="keen-slider__slide bg-white rounded shadow-md"
              >
                <img
                  src={product.image[0]}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-t"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold h-12 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="mt-1 font-bold text-blue-700">
                    From {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreGrid;
