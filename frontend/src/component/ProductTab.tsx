import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";

interface Product {
  _id: string;
  title: string;
  image: string[];
  price: string;
}

interface ProductTabProps {
  title: string;
  tabs: string[];
  productData: Record<string, Product[]>;
}

const ProductTab: React.FC<ProductTabProps> = ({
  title,
  tabs,
  productData,
}) => {
  const [selectedModel, setSelectedModel] = useState(tabs[0]);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    if (!product._id) return;
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.image[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-[#1b1655] mb-4">{title}</h2>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedModel(tab)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedModel === tab
                ? "bg-blue-700 text-white"
                : "border border-blue-700 text-blue-700 hover:bg-blue-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {productData[selectedModel]?.length ? (
          productData[selectedModel]
            .filter((product) => product._id) // ensure valid product
            .map((product) => (
              <div
                key={product._id}
                className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/product-details/${product._id}`}>
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="h-48 w-full object-cover"
                  />
                </Link>
                <div className="p-3">
                  <Link to={`/product-details/${product._id}`}>
                    <h3 className="text-sm font-semibold h-12 hover:underline">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="mt-1 font-bold text-blue-700">
                    From {product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
